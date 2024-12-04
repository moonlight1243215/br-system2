import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { CgAdd } from "react-icons/cg";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Importuj useLocation

const NewItem = ({ selectedItem, onUpdate }) => {
  const [startSurname, setStartSurname] = useState("");
  const [endSurname, setEndSurname] = useState("");
  const [company, setCompany] = useState("");
  const [mailDate, setMailDate] = useState("");
  const [mailTime, setMailTime] = useState("");
  const [mailId, setMailId] = useState("");
  const [realizationDate, setRealizationDate] = useState("");
  const [realizationPlace, setRealizationPlace] = useState("");
  const [comment, setComment] = useState("");
  const [rSeven, setRSeven] = useState("");
  const [mechanic, setMechanic] = useState("");
  const [addedCoast, setAddedCoast] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerPosition, setWorkerPosition] = useState("");
  const [workerWorkTime, setWorkerWorkTime] = useState("");
  const [realTimeWork, setRealTimeWork] = useState("");
  const [invoiceWorkTime, setInvoiceWorkTime] = useState("");
  const [workerKilometers, setWorkerKilometers] = useState(0);
  const [invoiceKilometers, setInvoiceKilometers] = useState(0);
  const [workerRoute, setWorkerRoute] = useState("");

  const location = useLocation(); // Użyj useLocation, aby uzyskać aktualną ścieżkę

  useEffect(() => {
    if (selectedItem) {
      setStartSurname(selectedItem.start_surname);
      setEndSurname(selectedItem.end_surname);
      setCompany(selectedItem.company);
      setMailDate(selectedItem.mail_data);
      setMailTime(selectedItem.mail_time);
      setMailId(selectedItem.mail_id);
      setRealizationDate(selectedItem.realization_date);
      setRealizationPlace(selectedItem.realization_place);
      setComment(selectedItem.comment);
      setRSeven(selectedItem.sent_r7);
      setMechanic(selectedItem.mechanic);
      setAddedCoast(selectedItem.added_coast);
      setWorkerName(selectedItem.worker_name);
      setWorkerPosition(selectedItem.worker_position);
      setWorkerWorkTime(selectedItem.worker_work_time);
      setRealTimeWork(selectedItem.real_time_work);
      setInvoiceWorkTime(selectedItem.invoice_work_time);
      setWorkerKilometers(selectedItem.worker_kilometers);
      setInvoiceKilometers(selectedItem.invoice_kilometers);
      setWorkerRoute(selectedItem.worker_route);
    } else {
      resetForm();
    }
  }, [selectedItem]);

  const resetForm = () => {
    setStartSurname("");
    setEndSurname("");
    setCompany("");
    setMailDate("");
    setMailTime("");
    setMailId("");
    setRealizationDate("");
    setRealizationPlace("");
    setComment("");
    setRSeven("");
    setMechanic("");
    setAddedCoast("");
    setWorkerName("");
    setWorkerPosition("");
    setWorkerWorkTime("");
    setRealTimeWork("");
    setInvoiceWorkTime("");
    setWorkerKilometers(0);
    setInvoiceKilometers(0);
    setWorkerRoute("");
  };

  const handleAddNewItem = async () => {
    const realizationStatus = location.pathname === '/office' ? "progress" : "done"; // Ustal status na podstawie ścieżki

    const newItem = {
      start_surname: startSurname,
      end_surname: endSurname,
      company,
      mail_data: mailDate,
      mail_time: mailTime,
      mail_id: mailId,
      realization_date: realizationDate,
      realization_place: realizationPlace,
      worker_name: workerName,
      worker_position: workerPosition,
      worker_work_time: workerWorkTime,
      real_time_work: realTimeWork,
      invoice_work_time: invoiceWorkTime,
      worker_kilometers: workerKilometers,
      invoice_kilometers: invoiceKilometers,
      worker_route: workerRoute,
      comment,
      sent_r7: rSeven,
      mechanic,
      added_coast: addedCoast,
      realization_status: realizationStatus, // Użyj ustalonego statusu
      bill_status: "progress",
      invoice_status: "progress",
      delete_status: "nie",
    };

    try {
      if (selectedItem) {
        await axios.put(`http://localhost:8081/realization/${selectedItem.id_realization}`, newItem, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        alert("Element zaktualizowany pomyślnie!");
        onUpdate(newItem); // Powiadom komponent nadrzędny o aktualizacji
      } else {
        const lastIdResponse = await axios.get("http://localhost:8081/realization/last-id", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const lastId = lastIdResponse.data.id_realization;

        newItem.id_realization = lastId + 1; // Ustaw nowy ID
        await axios.post("http://localhost:8081/realization", newItem, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        alert("Nowy element dodany pomyślnie!");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania/aktualizacji elementu:", error);
      alert("Wystąpił błąd podczas dodawania/aktualizacji elementu.");
    }
  };

  return (
    <div className={styles.newItemBox}>
      <div className={styles.mainBox}>
        <div className={styles.upBox}>
          <input value={startSurname} onChange={(e) => setStartSurname(e.target.value)} className={styles.startUserNew} placeholder="zaczynający" />
          <input value={endSurname} onChange={(e) => setEndSurname(e.target.value)} className={styles.endUserNew} placeholder="kończący" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} className={styles.companyNameNew} placeholder="firma" />
          <input value={mailDate} onChange={(e) => setMailDate(e.target.value)} className={styles.mailDateNew} placeholder="data maila" />
          <input value={mailTime} onChange={(e) => setMailTime(e.target.value)} className={styles.mailTimeNew} placeholder="godzina maila" />
          <input value={mailId} onChange={(e) => setMailId(e.target.value)} className={styles.mailIdNew} placeholder="id maila" />
          <input value={realizationDate} onChange={(e) => setRealizationDate(e.target.value)} className={styles.realizationDateNew} placeholder="data zlecenia" />
          <input value={realizationPlace} onChange={(e) => setRealizationPlace(e.target.value)} className={styles.realizationPlaceNew} placeholder="miejsce realizacji" />
          <input value={comment} onChange={(e) => setComment(e.target.value)} className={styles.commentNew} placeholder="komentarz" />
          <input value={rSeven} onChange={(e) => setRSeven(e.target.value)} className={styles.rSevenNew} placeholder="r7" />
          <input value={mechanic} onChange={(e) => setMechanic(e.target.value)} className={styles.mechanicNew} placeholder="maszynista" />
          <input value={addedCoast} onChange={(e) => setAddedCoast(e.target.value)} className={styles.addedCoastNew} placeholder="dodatkowe koszty" />
        </div>
        <div className={styles.downBox}>
          <input value={workerName} onChange={(e) => setWorkerName(e.target.value)} className={styles.workerNameNew} placeholder="pracownik" />
          <input value={workerPosition} onChange={(e) => setWorkerPosition(e.target.value)} className={styles.workerPositionNew} placeholder="stanowisko" />
          <input value={workerWorkTime} onChange={(e) => setWorkerWorkTime(e.target.value)} className={styles .workerWorkTimeNew} placeholder="czas pracownika" />
          <input value={realTimeWork} onChange={(e) => setRealTimeWork(e.target.value)} className={styles.realTimeWorkNew} placeholder="czas pracy" />
          <input value={invoiceWorkTime} onChange={(e) => setInvoiceWorkTime(e.target.value)} className={styles.invoiceWorkTimeNew} placeholder="czas faktura" />
          <input type="number" value={workerKilometers} onChange={(e) => setWorkerKilometers(e.target.value)} className={styles.workerKilometersNew} placeholder="kilometry pracownika" />
          <input type="number" value={invoiceKilometers} onChange={(e) => setInvoiceKilometers(e.target.value)} className={styles.invoiceKilometersNew} placeholder="kilometry faktura" />
          <input value={workerRoute} onChange={(e) => setWorkerRoute(e.target.value)} className={styles.workerRouteNew} placeholder="trasa pracownika" />
        </div>
      </div>
      <div className={styles.newItem} onClick={handleAddNewItem}>
        <CgAdd />
      </div>
    </div>
  );
};

export default NewItem;