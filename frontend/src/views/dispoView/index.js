import styles from "./index.module.scss";
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/logo.png';
import { CgArrowRightO, CgCloseO, CgMoreVerticalO } from "react-icons/cg";
import { FaMoneyBill1, FaCar } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
import NewItem from "../../components/newItem";

const DispoView = () => {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    id: '',
    company: '',
    realizationDate: '',
    realizationPlace: '',
    rank: '',
    time: '',
    workTime: '',
    invoiceTime: '',
    workerName: '',
    milage: '',
    invoiceMilage: '',
    route: '',
    warning: '',
    mechanic: '',
    addedCoast: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/realization', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
        console.error('Fetch error:', error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const result = data.filter((item) => 
        item.delete_status === 'nie' && 
        item.realization_status === "done" &&
        (!searchFilters.id || item.id_realization.toString().includes(searchFilters.id)) &&
        (!searchFilters.company || item.company.toLowerCase().includes(searchFilters.company.toLowerCase())) &&
        (!searchFilters.realizationDate || item.realization_date.includes(searchFilters.realizationDate)) &&
        (!searchFilters.realizationPlace || item.realization_place.toLowerCase().includes(searchFilters.realizationPlace.toLowerCase())) &&
        (!searchFilters.rank || item.worker_position.toLowerCase().includes(searchFilters.rank.toLowerCase())) &&
        (!searchFilters.time || item.worker_work_time.toLowerCase().includes(searchFilters.time.toLowerCase())) &&
        (!searchFilters.workTime || item.real_time_work.toLowerCase().includes(searchFilters.workTime.toLowerCase())) &&
        (!searchFilters.invoiceTime || item.invoice_work_time.toLowerCase().includes(searchFilters.invoiceTime.toLowerCase())) &&
        (!searchFilters.workerName || item.worker_name.toLowerCase().includes(searchFilters.workerName.toLowerCase())) &&
        (!searchFilters.milage || item.worker_kilometers.toString().includes(searchFilters.milage)) &&
        (!searchFilters.invoiceMilage || item.invoice_kilometers.toString().includes(searchFilters.invoiceMilage)) &&
        (!searchFilters.route || item.worker_route.toLowerCase().includes(searchFilters.route.toLowerCase())) &&
        (!searchFilters.warning || item.comment.toLowerCase().includes(searchFilters.warning.toLowerCase())) &&
        (!searchFilters.mechanic || item.mechanic.toLowerCase().includes(searchFilters.mechanic.toLowerCase())) &&
        (!searchFilters.addedCoast || item.added_coast.toString().includes(searchFilters.addedCoast))
      );
      setFiltredData(result);
    }
  }, [data, searchFilters]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  if (loading) return <div>Ładowanie danych...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  const handleDone = async (id) => {
    try {
      // Najpierw aktualizujemy realization_status
      const response = await fetch(`http://localhost:8081/realization/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ realization_status: 'done' }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const invoiceResponse = await fetch(`http://localhost:8081/realization/${id}/invoice-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoice_status: 'done' }),
      });
  
      if (!invoiceResponse.ok) {
        throw new Error('Network response was not ok for invoice status');
      }
  
      setFiltredData((prevData) => 
        prevData.map(item => 
          item.id_realization === id ? { ...item, realization_status: 'done', invoice_status: 'done' } : item // Aktualizujemy oba statusy w stanie
        )
      );
  
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/realization/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delete_status: 'tak' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFiltredData((prevData) => 
        prevData.map(item => 
          item.id_realization === id ? { ...item, delete_status: 'tak' } : item
        )
      );

    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleUpdate = (updatedItem) => {
    setFiltredData((prevData) => 
      prevData.map(item => 
        item.id_realization === updatedItem.id_realization ? { ...item, ...updatedItem } : item
      )
    );
    setSelectedItem(null); 
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleBillDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/realization/${id}/bill-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bill_status: 'done' }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok for bill status');
      }
  
      setFiltredData((prevData) => 
        prevData.map(item => 
          item.id_realization === id ? { ...item, bill_status: 'done' } : item // Aktualizujemy status w stanie
        )
      );
  
    } catch (error) {
      console.error('Update error:', error);
    }
  };
  
  const handleKilometerDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/realization/${id}/kilometer-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kilometer_status: 'done' }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok for kilometer status');
      }
  
      setFiltredData((prevData) => 
        prevData.map(item => 
          item.id_realization === id ? { ...item, kilometer_status: 'done' } : item // Aktualizujemy status w stanie
        )
      );
  
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <div className={styles.linkBox}>
          <Link className={styles.link} to='/office'>Dyspozytura</Link>
          <button className={styles.link} onClick={handleLogout}>Wyloguj</button> 
        </div>
      </div>
      <div className={styles.contentBox}>
        <div className={ `${styles.legendBox} ${styles.menuLegend}`}>
        <input 
            type="text" 
            name="id" 
            placeholder="ID" 
            value={searchFilters.id} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.id}`}
          />
          <input 
            type="text" 
            name="company" 
            placeholder="FIRMA" 
            value={searchFilters.company} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.company}`}
          />
          <input 
            type="text" 
            name="realizationDate" 
            placeholder="DATA REALIZACJI" 
            value={searchFilters.realizationDate} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.realizationDate}`}
          />
          <input 
            type="text" 
            name="realizationPlace" 
            placeholder="MIEJSCE REALIZACJI" 
            value={searchFilters.realizationPlace} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.realizationPlace}`}
          />
          <input 
            type="text" 
            name="rank" 
            placeholder="STANOWISKO" 
            value={searchFilters.rank} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.rank}`}
          />
          <input 
            type="text" 
            name="time" 
            placeholder="CZAS - PRÓBA" 
            value={searchFilters.time} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.time}`}
          />
          <input 
            type="text" 
            name="workTime" 
            placeholder="GODZINY PRACY" 
            value={searchFilters.workTime} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.workTime}`}
          />
          <input 
          type="text"
          name="invoiceTime"
          placeholder="Czas faktura"
          value={searchFilters.invoiceTime}
          onChange={handleSearchChange} 
          className={`${styles.legendText} ${styles.time}`}
          />
          <input 
            type="text" 
            name="workerName" 
            placeholder="NAZWA PRACOWNIKA" 
            value={searchFilters.workerName} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.workerName}`}
          />
          <input 
            type="text" 
            name="milage" 
            placeholder="KILOMETRY PRACOWNIKA" 
            value={searchFilters.milage} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.milage}`}
          />
          <input 
            type="text" 
            name="invoiceMilage" 
            placeholder="KILOMETRY FAKTURA" 
            value={searchFilters.invoiceMilage} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.milage}`}
          />
          <input 
            type="text" 
            name="route" 
            placeholder="TRASA PRACOWNIKA" 
            value={searchFilters.route } 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.route}`}
          />
          <input 
            type="text" 
            name="warning" 
            placeholder="UWAGI" 
            value={searchFilters.warning} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.warning}`}
          />
          <input 
            type="text" 
            name="mechanic" 
            placeholder="MASZYNISTA" 
            value={searchFilters.mechanic} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.warning}`}
          />

          <input 
            type="text" 
            name="addedCoast" 
            placeholder="DODATKOWE KOSZTY" 
            value={searchFilters.addedCoast} 
            onChange={handleSearchChange} 
            className={`${styles.legendText} ${styles.addedCoast}`}
          />
          <div className={styles.function}>
            <div className={styles.cancelButton}>
              <CgCloseO />
            </div>
            <div className={styles.editButton}>
              <CgMoreVerticalO />
            </div>
            <div className={styles.moneyButton}>
                <FaMoneyBill1 />
              </div>
              <div className={styles.kilometersButton}>
                <FaCar />
              </div>
            <div className={styles.doneButton}>
              <CgArrowRightO />
            </div>
          </div>
        </div>
        {filtredData.map((item) => (
           <div 
           className={`${styles.element}`} key={item.id_realization}>
            <p className={`${styles.legendText} ${styles.id} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.id_realization}</p>
            <p className={`${styles.legendText} ${styles.company} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.company}</p>
            <p className={`${styles.legendText} ${styles.realizationDate} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.realization_date}</p>
            <p className={`${styles.legendText} ${styles.realizationPlace} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.realization_place}</p>
            <p className={`${styles.legendText} ${styles.rank} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.worker_position}</p>
            <p className={`${styles.legendText} ${styles.time} ${item.bill_status === 'done' ? styles.doneTime : ''} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.worker_work_time}</p>
            <p className={`${styles.legendText} ${styles.workTime} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.real_time_work}</p>
            <p className={`${styles.legendText} ${styles.time} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.invoice_work_time}</p>
            <p className={`${styles.legendText} ${styles.workerName} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.worker_name}</p>
            <p className={`${styles.legendText} ${styles.milage} ${item.kilometer_status === 'done' ? styles.doneMilage : ''} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.worker_kilometers}</p>
            <p className={`${styles.legendText} ${styles.milageInvoice} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.invoice_kilometers}</p>
            <p className={`${styles.legendText} ${styles.route} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.worker_route}</p>
            <p className={`${styles.legendText} ${styles.warning} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.comment}</p>
            <p className={`${styles.legendText} ${styles.workerName} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.mechanic}</p>
            <p className={`${styles.legendText} ${styles.addedCoast} ${item.invoice_status === 'done' ? styles.doneElement : ''}`}>{item.added_coast}</p>
            <div className={styles.function}>
              <div className={`${styles.cancelButton} ${item.invoice_status === 'done' ? styles.doneElement : ''}`} onClick={() => handleCancel(item.id_realization)}>
                <CgCloseO />
              </div>
              <div className={`${styles.editButton} ${item.invoice_status === 'done' ? styles.doneElement : ''}`} onClick={() => handleEdit(item)}>
                <CgMoreVerticalO />
              </div>
              <div className={`${styles.moneyButton} ${item.invoice_status === 'done' ? styles.doneElement : ''}`} onClick={() => handleBillDone(item.id_realization)}>
                <FaMoneyBill1 />
              </div>
              <div className={`${styles.kilometersButton} ${item.invoice_status === 'done' ? styles.doneElement : ''}`} onClick={() => handleKilometerDone(item.id_realization)}>
                <FaCar />
              </div>
              <div className={`${styles.doneButton} ${item.invoice_status === 'done' ? styles.doneElement : ''}`} onClick={() => handleDone(item.id_realization)}>
                <CgArrowRightO />
              </div>
            </div>
          </div>
        ))}
      </div>
      <NewItem selectedItem={selectedItem} onUpdate={handleUpdate} />
    </div>
  );
};

export default DispoView;