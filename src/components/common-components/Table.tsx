import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon';

interface TableProps {
  columns: string[];
  data: any[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

const CustomTable: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} style={{ textTransform: 'none' }}>{column}</TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell>ACTION</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column] || 'N/A'}</TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell>
                  {onEdit && (
                    <IconButton onClick={() => onEdit(index)}>
                      <Icon icon='tabler:edit' />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton onClick={() => onDelete(index)}>
                      <Icon icon='tabler:trash' />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;