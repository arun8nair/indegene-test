import React, { Component } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RawTable from "../../components/Table";
import DrillDown from "../../components/DrillDown";
import { fetchRawData } from "../../services/apiService";
import { fetchApplications, fetchApplicationItem } from "../../services/apiService";
import { fetchResources, fetchResourceItem } from "../../services/apiService";
import "./styles.css";

interface ComponentState {
  rawData: any,
  applications: any,
  tabValue: number
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class Home extends Component<{}, ComponentState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      rawData: null,
      applications: null,
      tabValue: 0
    }
  }

  componentDidMount(): void {
    this.getRawData();
  }

  async getRawData() {
    try{
      const result1 = await fetchRawData(); 

      this.setState({
        rawData: result1
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleChange = (event: React.SyntheticEvent, newTabValue: number) => {
    this.setState({
      tabValue: newTabValue
    })
  }

  render() {
    const { rawData, tabValue } = this.state;

    return (
      <>
        <div className="header">
          <img className="logo" src="/sample-logo.png" alt="logo"/>
          
        </div>
        <div className="main-block">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={this.handleChange}>
              <Tab label="Appications" />
              <Tab label="Resources" />
              <Tab label="Raw Data" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <DrillDown loadData={fetchApplications} loadItemData={fetchApplicationItem} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <DrillDown loadData={fetchResources} loadItemData={fetchResourceItem} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <RawTable data = { rawData }/>
            </TabPanel>
          </Box>
        </div>
      </>
    )
  }
}

export default Home;
