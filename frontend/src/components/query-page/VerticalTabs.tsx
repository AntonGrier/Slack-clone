import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FunctionComponent, useState } from 'react'
import { TabPanel } from './TabPanel'
import { InsertQuery } from '.'
import { DeleteQuery } from '.'
import { SelectQuery } from '.'
import { JoinQuery } from '.'
import { RouteComponentProps } from '@reach/router'
import { NestedAggregationGroup } from './NestedAggregationGroup'
import { NestedAggregationGroupHaving } from './NestedAggregationGroupHaving'
import { Division } from './Division'
import { UpdateQuery } from './UpdateQuery'
import { AggregationGroup } from './AggregationGroup'
import { ProjectionQuery } from './ProjectionQuery'

function propBuilder(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export const VerticalTabs: FunctionComponent<RouteComponentProps> = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: '80vh',
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Query tabs'
        sx={{
          justifyContent: 'space-between',
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Tab label='Select Query' {...propBuilder(0)} />
        <Tab label='Join Query' {...propBuilder(1)} />
        <Tab label='INSERT' {...propBuilder(2)} />
        <Tab label='DELETE' {...propBuilder(3)} />
        <Tab label='UPDATE' {...propBuilder(4)} />
        <Tab label='Aggregation with Group By' {...propBuilder(5)} />
        <Tab label='Nested Aggregation with GROUP BY' {...propBuilder(6)} />
        <Tab label='Nested Aggregation with HAVING' {...propBuilder(7)} />
        <Tab label='Division' {...propBuilder(8)} />
        <Tab label='Projection query' {...propBuilder(9)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SelectQuery />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JoinQuery />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InsertQuery />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DeleteQuery />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <UpdateQuery />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <AggregationGroup />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <NestedAggregationGroup />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <NestedAggregationGroupHaving />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Division />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <ProjectionQuery />
      </TabPanel>
    </Box>
  )
}
