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
          backgroundColor: "oklch(var(--b1))",
          borderRadius: "0.5rem",
          boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-cell": {
            color: "oklch(var(--bc))",
            fontWeight: "bold",
            border: "1px solid oklch(var(--b2))",
          },
          "& .MuiCheckbox-root": {
            color: "oklch(var(--p))",
          },
          "& .MuiDataGrid-columnHeader": {
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "oklch(var(--b1))",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "oklch(var(--b1))",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            color: "oklch(var(--p))",
            fontSize: "12px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiDataGrid-overlay": {
            backgroundColor: "oklch(var(--b1))",
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
            backgroundColor: "oklch(var(--b1))",
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
        }}
      />
    </div>
  );
}
