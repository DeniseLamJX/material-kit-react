import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import IconButton from "@mui/material/IconButton";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import TextField from "@mui/material/TextField";

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    firstName: 'Denise',
    lastName: 'Lam',
    contractHash:'0xc405e89C344e9C68471060c6a70177F1FE002341',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    
  },
  {
    
firstName: "DDenise",
lastName: "randome",
contractHash: "0x31766BB94F5A4e5029a04c23F2B40eF87F97aAa6",
createdAt: subDays(subHours(now, 7), 7).getTime(),
  },
  {
    firstName: "Happy",
    lastName: "No",
    contractHash: "0xc4e775547B49c0BaAb93E2A3B84E5cd4e395c40c",
    createdAt: subDays(subHours(now, 7), 7).getTime(),
  },
  {
    
    firstName: "Tom",
    lastName:  "Harry",
    createdAt: subDays(subHours(now, 7), 7).getTime(),
    contractHash:   "0xf2044b8036f8BBde728CD47f19fC282DFe1c37A5",
  },
  {
    
    firstName: "Try",
    lastName:  "Me",
    createdAt: subDays(subHours(now, 7), 7).getTime(),
    contractHash:   "0xfA1AB79Eb60459ABe6578E58CF08eA4652d83aBe",
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

// const SearchBar = ({setSearchQuery}) => (
//   <form>
//     <TextField
//       id="search-bar"
//       className="text"
//       onInput={(e) => {
//         setSearchQuery(e.target.value);
//       }}
//       label="Enter a city name"
//       variant="outlined"
//       placeholder="Search..."
//       size="small"
//     />
//     <IconButton type="submit" aria-label="search">
//       <MagnifyingGlassIcon style={{ fill: "blue" }} />
//     </IconButton>
//   </form>
// );

// const filterData = (query, data) => {
//   if (!query) {
//     return data;
//   } else {
//     return data.firstName.filter((d) => d.toLowerCase().includes(query));
//   }
// };


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  // const [searchQuery, setSearchQuery] = useState("");
  // const dataFiltered = filterData(searchQuery, data);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Candidate List
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Candidate List
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >

                </Stack>
              </Stack>
              <div>
                
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
        {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
      {/* <div style={{ padding: 3 }}>
        {dataFiltered.map((d) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              BorderColor: "green",
              borderWidth: "10px"
            }}
            key={d.id}
          >
            {d}
          </div>
        ))}
      </div> */}


            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
