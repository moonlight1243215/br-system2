import styles from "./index.module.scss";
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/logo.png';
import { CgArrowRightO, CgCloseO, CgMoreVerticalO } from "react-icons/cg";
import React, { useEffect, useState } from 'react';
import NewItem from "../../components/newItem";

const OfficeView = () => {
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
    workerName: '',
    milage: '',
    route: '',
    warning: '',
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
        item.realization_status === "progress" &&
        (!searchFilters.id || item.id_realization.toString().includes(searchFilters.id)) &&
        (!searchFilters.company || item.company.toLowerCase().includes(searchFilters.company.toLowerCase())) &&
        (!searchFilters.realizationDate || item.realization_date.includes(searchFilters.realizationDate)) &&
        (!searchFilters.realizationPlace || item.realization_place.toLowerCase().includes(searchFilters.realizationPlace.toLowerCase())) &&
        (!searchFilters.rank || item.worker_position.toLowerCase().includes(searchFilters.rank.toLowerCase())) &&
        (!searchFilters.time || item.worker_work_time.toLowerCase().includes(searchFilters.time.toLowerCase())) &&
        (!searchFilters.workTime || item.real_time_work.toLowerCase().includes(searchFilters.workTime.toLowerCase())) &&
        (!searchFilters.workerName || item.worker_name.toLowerCase().includes(searchFilters.workerName.toLowerCase())) &&
        (!searchFilters.milage || item.worker_kilometers.toString().includes(searchFilters.milage)) &&
        (!searchFilters.route || item.worker_route.toLowerCase().includes(searchFilters.route.toLowerCase())) &&
        (!searchFilters.warning || item.comment.toLowerCase().includes(searchFilters.warning.toLowerCase())) &&
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
  
      setFiltredData((prevData) => 
 prevData.map(item => 
          item.id_realization === id ? { ...item, realization_status: 'done' } : item
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
    setSelectedItem(null); // Reset selected item after update
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBox}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <div className={styles.linkBox}>
          <Link className={styles.link} to='/dispo'>Biuro</Link>
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
            <div className={styles.doneButton}>
              <CgArrowRightO />
            </div>
          </div>
        </div>
        {filtredData.map((item) => (
          <div className={styles.element} key={item.id_realization}>
            <p className={`${styles.legendText} ${styles.id}`}>{item.id_realization}</p>
            <p className={`${styles.legendText} ${styles.company}`}>{item.company}</p>
            <p className={`${styles.legendText} ${styles.realizationDate}`}>{item.realization_date}</p>
            <p className={`${styles.legendText} ${styles.realizationPlace}`}>{item.realization_place}</p>
            <p className={`${styles.legendText} ${styles.rank}`}>{item.worker_position}</p>
            <p className={`${styles.legendText} ${styles.time}`}>{item.worker_work_time}</p>
            <p className={`${styles.legendText} ${styles.workTime}`}>{item.real_time_work}</p>
            <p className={`${styles.legendText} ${styles.workerName}`}>{item.worker_name}</p>
            <p className={`${styles.legendText} ${styles.milage}`}>{item.worker_kilometers}</p>
            <p className={`${styles.legendText} ${styles.route}`}>{item.worker_route}</p>
            <p className={`${styles.legendText} ${styles.warning}`}>{item.comment}</p>
            <p className={`${styles.legendText} ${styles.addedCoast}`}>{item.added_coast}</p>
            <div className={styles.function}>
              <div className={styles.cancelButton} onClick={() => handleCancel(item.id_realization)}>
                <CgCloseO />
              </div>
              <div className={styles.editButton} onClick={() => handleEdit(item)}>
                <CgMoreVerticalO />
              </div>
              <div className={styles.doneButton} onClick={() => handleDone(item.id_realization)}>
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

export default OfficeView;