import { useEffect, useState } from "react"
import ItemsTable from "../ItemsTable";
import RawTable from "../Table";
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  loadData: Function,
  loadItemData: Function
}

export default function Applications({loadData, loadItemData}: Props) {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [item, setItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    const result = await loadData();
    setData(result);
    setIsLoading(false);
  };

  const fetchItemData = async (item: string) => {
    setIsLoading(true);
    const result = await loadItemData(item);
    setItem(item);
    setPage(1);
    setData(result);
    setIsLoading(false);
  };

  const handlePageReturn = async() => {
    setIsLoading(true);
    await fetchAllItems();
    setPage(0);
  }

  return (
    isLoading ? <LoadingSpinner /> : 
    <>
      {page === 0 ? 
        <div>
          <ItemsTable data = {data} handleRowClick = {fetchItemData}/>
        </div> :
        <div>
          <div style={{textAlign: "left"}}>
            <span 
              style={{textDecoration: "underline", color: "mediumblue", cursor: "pointer"}} 
              onClick={handlePageReturn}>
              Back
              </span> &lt;&lt; {item}
            
          </div>
          <RawTable data = {data} />
        </div>
      }
    </>
    
  )
}