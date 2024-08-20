import * as XLSX from 'xlsx' 
// export function exportExcel22(filename,data) {
//     let exc = XLSX.utils.book_new();
//     let exc_data = XLSX.utils.aoa_to_sheet(data); 
//     XLSX.utils.book_append_sheet(exc, exc_data, filename);
//     XLSX.writeFile(exc, filename + 'xlsx');
// }

export function exportExcel(filename: string, data: any[]) {
    const header = Object.keys(data[0]);
    let dataArray: any[][] = [header]; // Include header as the first row
  
   // 遍历数据，获取每列的最大宽度
     const columnWidths: number[] = header.map(() => 0); // 初始化列宽数组为0

    data.forEach(item => {
        header.forEach((key, index) => {
         const cellValue = String(item[key]);
        if (cellValue.length > columnWidths[index]) {
            columnWidths[index] = cellValue.length; // 更新最大宽度
        }
        });

    let row: any[] = header.map(key => item[key]);
     dataArray.push(row);
    });

  // 创建 workbook 和 worksheet
  let workbook = XLSX.utils.book_new();
  let worksheet = XLSX.utils.aoa_to_sheet(dataArray);

  // 设置每列的宽度
  const excelColumns = header.map((key, index) => ({
    width: columnWidths[index] + 12 // 加上额外空白字符，确保内容不被截断
  }));
  worksheet['!cols'] = excelColumns;
    XLSX.utils.book_append_sheet(workbook, worksheet, filename);
    XLSX.writeFile(workbook, filename + '.xlsx');
  }
