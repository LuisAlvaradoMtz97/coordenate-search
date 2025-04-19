import * as XLSX from 'xlsx';

const useXlsx = () => {
    const getWidthColumns = (sizes = []) => {
        return sizes.map((size) => {
            return { wch: size }
        })
    }
     const exportToXlsx = (data, fileName = "File.xlsx", widthColumns = []) => {
        const workSheet = XLSX.utils.aoa_to_sheet(data);

        if(widthColumns.length > 0) {
            const styleColumns = getWidthColumns(widthColumns);
            workSheet['!cols'] = styleColumns;
        }

        const workbook =XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, workSheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    }

    const readXlsx = (dataFile ) => {

        const data = new Uint8Array(dataFile);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const arrayData = XLSX.utils.sheet_to_json(worksheet, 
            { header: 1, raw: true, defval: null , rawNumbers:false});
        const result = arrayData?.slice(1);


        return result;

    }

    return {
        exportToXlsx,
        readXlsx
    }

}

export default useXlsx;