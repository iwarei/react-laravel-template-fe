import React from 'react';

export type HeaderCellProps = {
  type?: 'text' | 'html';
  text?: string;
  textColor?: string;
  bgColor?: string;
  width?: string;
  weight?: 'bold' | 'normal' | 'lighter' | 'bolder';
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  html?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableCellElement>;
  id?: string | number;
};

export type HeaderProps = {
  cellProps: HeaderCellProps[];
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableRowElement>;
  id?: string | number;
};

export type CellProps = {
  type?: 'text' | 'html';
  text?: string;
  bold?: boolean;
  textColor?: string;
  bgColor?: string;
  className?: string; // type: textの場合のみ有効。
  rowSpan?: number;
  colSpan?: number;
  html?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableCellElement>;
  id?: string | number;
};

export type RowProps = {
  cellProps: CellProps[];
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableRowElement>;
  id?: string | number;
};

export type TableProps = {
  // select?: 'check' | 'radio' | undefined;
  // width?: string;
  // widthFlex?: number[];
  className?: string;
  headerProps?: HeaderProps[];
  rowProps?: RowProps[];
  hover?: boolean;
  border?: boolean;
  shadow?: boolean;
};

export const Table = ({
  // select,
  // width,
  // widthFlex,
  className,
  headerProps,
  rowProps,
  hover = true,
  border = true,
  shadow = true,
}: TableProps) => {
  return (
    <div
      className={`relative overflow-x-auto${
        shadow ? ' shadow-md' : ''
      } sm:rounded-lg`}
    >
      <table
        className={`w-full table-fixed text-left text-gray-500 dark:text-gray-400 ${
          className ?? ''
        }`}
      >
        <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          {headerProps?.map((row: HeaderProps, rowIndex: number) => {
            return (
              <tr key={`h-r${rowIndex + 1}`}>
                {row.cellProps.map(
                  (cell: HeaderCellProps, colIndex: number) => {
                    return (
                      <th
                        scope="col"
                        className={cell.className ?? `px-6 py-4`}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}
                        style={{
                          width: cell.width,
                        }}
                        key={`h-r${rowIndex + 1}-c${colIndex + 1}`}
                        onFocus={cell.onFocus}
                      >
                        {cell.type === 'html' ? (
                          cell.html
                        ) : (
                          <span
                            style={{
                              fontWeight: cell.weight,
                              color: cell.textColor,
                              backgroundColor: cell.bgColor,
                            }}
                          >
                            {cell.text}
                          </span>
                        )}
                      </th>
                    );
                  }
                )}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {rowProps?.map((rowProp: RowProps, rowIndex: number) => {
            return (
              <tr
                className={`bg-white${
                  border ? ' border-b' : ''
                } dark:bg-gray-800 dark:border-gray-700${
                  hover ? ' hover:bg-gray-50 dark:hover:bg-gray-600' : ''
                }`}
                onClick={rowProp.onClick}
                onFocus={rowProp.onFocus}
                id={
                  typeof rowProp.id === 'number'
                    ? rowProp.id.toString()
                    : rowProp.id
                }
                key={`r${rowIndex + 1}`}
              >
                {rowProp.cellProps.map((cell: CellProps, colIndex: number) => {
                  if (cell.type === 'text' && cell.bold) {
                    return (
                      <th
                        scope="row"
                        className={
                          cell.className ??
                          `px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`
                        }
                        id={
                          typeof cell.id === 'number'
                            ? cell.id.toString()
                            : cell.id
                        }
                        rowSpan={cell.rowSpan}
                        colSpan={cell.colSpan}
                        onClick={cell.onClick}
                        onFocus={cell.onFocus}
                        key={`r${rowIndex + 1}-c${colIndex + 1}`}
                      >
                        {cell.text}
                      </th>
                    );
                  }
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <td
                      className={
                        cell.type === 'html'
                          ? cell.className
                          : cell.className ?? `px-6 py-4`
                      }
                      id={
                        typeof cell.id === 'number'
                          ? cell.id.toString()
                          : cell.id
                      }
                      rowSpan={cell.rowSpan}
                      colSpan={cell.colSpan}
                      onClick={cell.onClick}
                      onFocus={cell.onFocus}
                      key={`r${rowIndex + 1}-c${colIndex + 1}`}
                    >
                      {cell.type !== 'html' ? (
                        <span
                          style={{
                            color: cell.textColor,
                            backgroundColor: cell.bgColor,
                          }}
                        >
                          {cell.text}
                        </span>
                      ) : (
                        cell.html
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
