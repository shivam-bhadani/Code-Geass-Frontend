import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';

const tempRows = [
	{
		name: "Shivam Bhadani",
		score: 1208
	},
	{
		name: "Light Yagami",
		score: 1100
	},
	{
		name: "Monkey D. Luffy",
		score: 1000
	},
	{
		name: "Naruto",
		score: 1150
	},
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


const LeaderBoard = () => {

	tempRows.sort((a, b) => (b.score - a.score));

	const rows = tempRows.map((row, id) => {
		return { ...row, rank: id + 1 }
	})

	const [pg, setpg] = React.useState(0);
	const [rpg, setrpg] = React.useState(10);

	function handleChangePage(event, newpage) {
		setpg(newpage);
	}

	function handleChangeRowsPerPage(event) {
		setrpg(parseInt(event.target.value, 10));
		setpg(0);
	}

	return (
		<TableContainer component={Paper} sx={{ m: "auto", width: "1200px", maxWidth: "90%", mt: "30px" }}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Rank</StyledTableCell>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell>Score</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.slice(pg * rpg, pg * rpg + rpg).map((row) => (
						<StyledTableRow
							key={row.rank}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<StyledTableCell>{row.rank}</StyledTableCell>
							<StyledTableCell> {row.name}</StyledTableCell>
							<StyledTableCell>{row.score}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[10, 50, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rpg}
				page={pg}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>

	);
}

export default LeaderBoard;