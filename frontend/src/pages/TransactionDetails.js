import React, { useEffect, useState } from 'react';
import { GetTransactionData } from '../api/transactionApi';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Typography } from '@mui/material';

const TransactionDetails = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

    useEffect(() => {
        getTransactionDetails();
    }, []);

    const getTransactionDetails = async () => {
        const res = await GetTransactionData();
        setTransactions(res.data);
        setFilteredTransactions(res.data); // Initialize filtered transactions
    };

    // Filter transactions when searchTerm or transactions change
    useEffect(() => {
        const filtered = transactions.filter(transaction =>
            transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.to.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTransactions(filtered);
    }, [searchTerm, transactions]);

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredTransactions].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTransactions(sortedData);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Transaction Details</Typography>

            {/* Search input */}
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
                fullWidth
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Transaction ID', 'Amount', 'Description', 'From', 'To', 'Date'].map((header, index) => (
                                <TableCell key={index}>
                                    <TableSortLabel
                                        active={sortConfig.key === header.toLowerCase()}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort(header.toLowerCase())}
                                    >
                                        {header}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map(transaction => (
                            <TableRow key={transaction._id}>
                                <TableCell>{transaction._id}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.from}</TableCell>
                                <TableCell>{transaction.to}</TableCell>
                                <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TransactionDetails;
