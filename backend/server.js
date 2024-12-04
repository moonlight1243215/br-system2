const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware do obsługi JSON

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "br_system",
});

// Endpoint logowania
app.post('/login', (req, res) => {
   const { email, password } = req.body;

   const sql = "SELECT * FROM users WHERE email = ?";
   db.query(sql, [email], (err, results) => {
       if (err) return res.status(500).json({ error: err.message });
       if (results.length === 0) return res.status(401).json({ message: "Nieprawidłowy email lub hasło" });

       const user = results[0];
       bcrypt.compare(password, user.password, (err, match) => {
           if (err) return res.status(500).json({ error: err.message });
           if (!match) return res.status(401).json({ message: "Nieprawidłowy email lub hasło" });

           const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
           res.json({ token });
       });
   });
});

// Middleware do ochrony tras
const authenticateJWT = (req, res, next) => {
   const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
   if (!token) return res.sendStatus(403);

   jwt.verify(token, 'secret_key', (err, user) => {
       if (err) return res.sendStatus(403);
       req.user = user;
       next();
   });
};

// Użyj middleware do ochrony tras
app.get("/realization", authenticateJWT, (req, res) => {
   const sql = "SELECT * FROM realizacja"; // Upewnij się, że ta tabela istnieje w bazie danych
   db.query(sql, (err, data) => {
       if (err) {
           console.error(err); // Dodaj logowanie błędów
           return res.status(500).json({ error: "Error fetching data" });
       }
       return res.json(data);
   });
});

app.put('/realization/:id', authenticateJWT, (req, res) => {
   const { id } = req.params;
   const { delete_status } = req.body;

   const sql = "UPDATE realizacja SET delete_status = ? WHERE id_realization = ?";
   db.query(sql, [delete_status, id], (err, result) => {
       if (err) {
           console.error(err);
           return res.status(500).json({ error: "Error updating data" });
       }
       return res.json({ message: "Status updated successfully" });
   });
});

app.put('/realization/:id/status', authenticateJWT, (req, res) => {
   const { id } = req.params;
   const { realization_status } = req.body;
 
   const sql = "UPDATE realizacja SET realization_status = ? WHERE id_realization = ?";
   db.query(sql, [realization_status, id], (err, result) => {
     if (err) {
       console.error(err);
       return res.status(500).json({ error: "Error updating data" });
     }
     return res.json({ message: "Status updated successfully" });
   });
});

app.post('/realization', authenticateJWT, (req, res) => {
   const newItem = req.body;

   const sql = "INSERT INTO realizacja SET ?";
   db.query(sql, newItem, (err, result) => {
       if (err) {
           console.error(err);
           return res.status(500).json({ error: "Error adding new item" });
       }
       return res.status(201).json({ message: "New item added successfully", id: result.insertId });
   });
});

app.get('/realization/last-id', authenticateJWT, (req, res) => {
   const sql = "SELECT MAX(id_realization) AS id_realization FROM realizacja";
   db.query(sql, (err, results) => {
       if (err) {
           console.error(err);
           return res.status(500).json({ error: "Error fetching last id" });
       }
       return res.json(results[0]);
   });
});

app.put('/realization/:id/invoice-status', authenticateJWT, (req, res) => {
    const { id } = req.params;
    const { invoice_status } = req.body;
 
    const sql = "UPDATE realizacja SET invoice_status = ? WHERE id_realization = ?";
    db.query(sql, [invoice_status, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error updating invoice status" });
      }
      return res.json({ message: "Invoice status updated successfully" });
    });
 });

 app.put('/realization/:id/bill-status', authenticateJWT, (req, res) => {
    const { id } = req.params;
    const { bill_status } = req.body;
  
    const sql = "UPDATE realizacja SET bill_status = ? WHERE id_realization = ?";
    db.query(sql, [bill_status, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error updating bill status" });
      }
      return res.json({ message: "Bill status updated successfully" });
    });
  });
  
  app.put('/realization/:id/kilometer-status', authenticateJWT, (req, res) => {
    const { id } = req.params;
    const { kilometer_status } = req.body;
  
    const sql = "UPDATE realizacja SET kilometer_status = ? WHERE id_realization = ?";
    db.query(sql, [kilometer_status, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error updating kilometer status" });
      }
      return res.json({ message: "Kilometer status updated successfully" });
    });
  });

app.listen(8081, () => {
   console.log("Listening...");
});