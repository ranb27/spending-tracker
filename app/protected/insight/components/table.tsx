import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";

export default function table({
  data = [],
  columns = [],
}: {
  data: [];
  columns: GridColDef[];
}) {
  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        density="compact"
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{
          color: "oklch(var(--bc))",
          fontWeight: "bold",
          border: "none",
          height: 250,
          backgroundColor: "transparent",
          borderRadius: "0.5rem",
          "& .MuiDataGrid-cell": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
            border: "1px solid oklch(var(--b2))",
          },
          "& .MuiCheckbox-root": {
            color: "oklch(var(--p))",
          },
          "& .MuiDataGrid-columnHeaderRow": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-topContainer": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-columnHeader": {
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "transparent",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            color: "oklch(var(--a))",
            fontSize: "12px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiDataGrid-overlay": {
            backgroundColor: "transparent",
          },
          " & .MuiTablePagination-root": {
            color: "oklch(var(--bc))",
          },
          " & .MuiSvgIcon-root ": {
            color: "oklch(var(--bc))",
          },
          "& .MuiButton-text": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
          },
          "& .MuiTablePagination-selectLabel": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
          },
          "& .MuiTablePagination-displayedRows": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
          },
          "& .MuiSelect-select": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
          },
          "& .MuiInputBase-root": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnsContainer": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-row": {
            border: "none",
          },
          "& .MuiDataGrid-row--borderBottom": {
            backgroundColor: "transparent",
          },
        }}
      />
    </div>
  );
}
