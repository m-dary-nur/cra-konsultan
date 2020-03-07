import React, { memo, useState, useEffect } from "react"
import { AutoSizer, Table as TableRV, Column } from "react-virtualized"
import highlight from "../helpers/highlight"
import thousand from "../helpers/thousand"

import "react-virtualized/styles.css"

const styled = {
	height: 40,    
	width: '100%',
	overflow: 'hidden',
	textAlign: 'center',
	lineHeight: '2.7',
	backgroundColor: '#f5f7f9'
}

const Search = memo(({ setSearchText }) => {
	const [searchDebounce, setSearchDebounce] = useState('')
	const handleChange = value => setSearchDebounce(value)	

	useEffect(() => {
		const handler = setTimeout(() => setSearchText(searchDebounce), 700)
		return (() => {
			clearTimeout(handler)
		})
	}, [searchDebounce, setSearchText])
	
	return (
		<input
			value={searchDebounce}
			onChange={handleChange}
			placeholder='cari data...'
		/>
	)
})

const TableHeader = memo(({ data, setSearchText, labelCount }) => {		
	return (
		<div>
			<div>
				<div>
					<span>{thousand(data.length)}</span> <span>{labelCount || 'data'}</span>
				</div>
				<div xs={6} sm={4} md={3}>
					<Search setSearchText={setSearchText} />
				</div>
			</div>
		</div>
	)
})

const Table = ({ height, data, options, menu, labelCount }) => {

    const { head, action } = options	
	const [searchText, setSearchText] = useState('')
	const display = head.map(o => (o.render ? o.render : o.column))
    const dataFiltered = data.filter(x => !x.isHide && display.some(render => {
        const str = typeof render === 'function' ? render(x) : x[render] === null ? '-' : x[render]
        return str.toString().toLowerCase().includes(searchText.toLowerCase())
    }))	
    
    return (
        <AutoSizer disableHeight>
            {({ width }) => (
                <div style={{ width }}>
                    <TableHeader labelCount={labelCount} setSearchText={setSearchText} data={dataFiltered} />
                    <TableRV					
                        width={width}
                        height={height}
                        headerHeight={30}
                        rowHeight={40}
                        rowCount={dataFiltered.length}
                        rowGetter={({ index }) => dataFiltered[index]}
                        rowClassName={({ index }) => (index < 0) ? 'even-row' : (index % 2 === 0 ? 'even-row' : 'odd-row')}
                        noRowsRenderer={() => <div style={styled} className='even-row'>Tidak menemukan data</div>}
                    >
                        <Column
                            width={80}
                            label='#'
                            cellRenderer={({ rowIndex }) => rowIndex + 1}
                            dataKey="index"
                        />
                        {head.map(o => (
                            <Column
                                key={o.column}
                                width={o.width || 150}
                                flexGrow={o.scale || 1}
                                label={o.label}
                                dataKey={o.column}							
                                cellRenderer={({ rowData }) => highlight((o.render ? o.render(rowData).toString() : (rowData[o.column] === '' ? '-' : rowData[o.column])), searchText)}
                            />
                        ))}
                        <Column 
                            width={35}
                            dataKey='action'
                            cellRenderer={({ rowData }) => <div action={action} obj={rowData} menu={menu} />}
                        />
                    </TableRV>
                </div>
            )}
        </AutoSizer>        
    )
}

export default memo(Table)