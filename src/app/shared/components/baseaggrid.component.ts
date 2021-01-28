import { OnInit, OnDestroy, Directive, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IDatasource, ColDef, IGetRowsParams, GridApi } from 'ag-grid-community';

import { Base } from 'app/shared/components/base.component';
import { TemplateRendererComponent } from './template-renderer.component';
import UrlQueryBuilder from 'app/shared/helpers/urlquerybuilder';

@Directive()
export abstract class BaseAgGrid extends Base implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  // default grid options
  public gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true
    },
    animateRows: true,
    pagination: true,
    rowModelType: 'infinite',
    rowHeight: 45,
    cacheBlockSize: 10,
    paginationPageSize: 10,
    suppressCellSelection: true,
  };

  public dataSource: IDatasource;
  public columnDefs: ColDef[];

  public defaultColDef = {
    sortable: false,
    filter: false,
    floatingFilter: true,
    resizable: true,
  };

  public dataSourceCallBack: (qParams: any) => Observable<any>;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onGridReady(params) {
    const api = params.api as GridApi;
    api.sizeColumnsToFit();
    api.setDatasource(this.dataSource);
  }

  refreshTable() {
    this.agGrid.api.setDatasource(this.dataSource);
  }

  getIndexColDef(headerName: string = '#', width: number = 35): ColDef {
    return <ColDef> {
      headerName: headerName,
      lockPosition: true,
      valueGetter: 'node.rowIndex + 1',
      cellClass: 'locked-col',
      width: width,
      suppressNavigable: true,
      sortable: false,
      filter: false
    };
  }

  getColDef(headerName: string, field: string, filter: boolean = false, sortable: boolean = false, type: string = ''): ColDef {
    let colDef: ColDef = {
      headerName: headerName,
      field: field,
      filter: filter,
      sortable: sortable,
      suppressMenu: true,
    };

    if (filter)
      colDef.filterParams = { suppressAndOrCondition: true, filterOptions: ['contains', 'equals'] }

    if (type != '')
      colDef.type = type;

    return colDef;
  }

  getPinnedColDef(
    headerName: string, 
    field: string, 
    pinned: string | boolean, 
    filter: boolean = false, 
    sortable: boolean = false, 
    type: string = ''
  ): ColDef {
    const colDef = this.getColDef(headerName, field, filter, sortable, type);
    colDef.pinned = 'left';
    return colDef;
  }

  getNumberColDef(headerName: string, field: string, filter: boolean = false, sortable: boolean = false) {
    let colDef = <ColDef> {
      headerName: headerName,
      field: field,
      type: 'numericColumn',
      suppressMenu: true,
      width: 100,
      floatingFilterComponentParams: { suppressFilterButton: true },
      cellStyle: { 
        'justify-content': 'flex-end'
      }
    };

    if (filter)
      colDef.filter = 'agNumberColumnFilter';
    
    return colDef;
  }

  getDateColDef(headerName: string, field: string, ) {
    let colDef = <ColDef> {
      headerName: headerName,
      field: field,
      filter: 'agDateColumnFilter',
      sortable: true,
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      filterParams: {
        debounceMs: 500
      }
    }
    
    return colDef;
  }

  getTemplateColDef(
    headerName: string, 
    field: string,
    width: number = 100,
    pinned: string | boolean = false,
    template: TemplateRef<any>): ColDef {
    return <ColDef> {
      headerName: headerName,
      field: field,
      sortable: false,
      filter: false,
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      width: width,
      pinned: pinned,
      cellRendererFramework: TemplateRendererComponent,
      cellRendererParams: {
        ngTemplate: template
      },
      minWidth: 100,
    }
  }

  getStatusColDef(
    headerName: string, 
    field: string,
    width: number = 100,
    pinned: string | boolean = false,
    template: TemplateRef<any>): ColDef {

    return <ColDef> {
      headerName: headerName,
      field: field,
      sortable: true,
      filter: true,
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      width: width,
      pinned: pinned,
      cellRendererFramework: TemplateRendererComponent,
      cellRendererParams: {
        ngTemplate: template
      },
      minWidth: 100,
    }
  }

  getActionColDef(
    headerName: string, 
    field: string,
    width: number = 100,
    template: TemplateRef<any>): ColDef {
    
    return <ColDef>{
      headerName: headerName,
      field: field,
      sortable: false,
      filter: false,
      width: width,
      cellRendererFramework: TemplateRendererComponent,
      cellRendererParams: {
        ngTemplate: template
      }
    };
  }

  getCustomColDef(
    headerName: string, 
    field: string,
    width: number = 100,
    template: TemplateRef<any>): ColDef {

    return <ColDef>{
      headerName: headerName,
      field: field,
      sortable: false,
      filter: false,
      flex: 1,
      cellStyle: { "white-space": "normal" },
      width: width,
      wrapText: true,
      autoHeight: true,
      cellRendererFramework: TemplateRendererComponent,
      cellRendererParams: {
        ngTemplate: template
      }
    };
  }

  setDataSource() {
    this.dataSource = {
      getRows: (params: IGetRowsParams) => {
        const urlParams = UrlQueryBuilder.buildUrlFromAgGrid(params);
        this.gridOptions.api.showLoadingOverlay();
        // perform callback from datasource
        this.dataSourceCallBack(urlParams)
          .pipe(takeUntil(this.destroy$))
          .subscribe(response => {
            this.gridOptions.api.hideOverlay();
            params.successCallback(
              response.data.data, response.data.total
            );
          });
      }
    }
  }
}