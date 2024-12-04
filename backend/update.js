// const mysql = require('mysql');
// const bcrypt = require('bcrypt');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "br_system",
// });

// const users = [
//     { id: 1, email: "user1@example.com", newPassword: "haslo1" },
//     { id: 2, email: "user2@example.com", newPassword: "haslo2" },
//     { id: 3, email: "user3@example.com", newPassword: "newPassword3" },
//     { id: 4, email: "user4@example.com", newPassword: "newPassword4" },
//     { id: 5, email: "user5@example.com", newPassword: "newPassword5" },
// ];

// const updatePasswords = async () => {
//     for (const user of users) {
//         const hashedPassword = await bcrypt.hash(user.newPassword, 10);
//         const sql = "UPDATE users SET password = ? WHERE id = ?";
        
//         db.query(sql, [hashedPassword, user.id], (err, results) => {
//             if (err) {
//                 console.error(`Error updating password for user ${user.email}:`, err.message);
//             } else {
//                 console.log(`Password updated for user ${user.email}`);
//             }
//         });
//     }
    
//     db.end(); // Zamknij połączenie z bazą danych
// };

// // Połączenie z bazą danych i uruchomienie aktualizacji haseł
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err.stack);
//         return;
//     }
//     console.log('Connected to database.');
//     updatePasswords();
// });