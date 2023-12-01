const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Route de lecture (GET) : Récupérer tous les todos
  router.get("/api/todoList", (req, res) => {
    const query = "SELECT * FROM todo";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des todos :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des todos" });
      }
      res.json(results);
    });
  });

  // Route de création (POST) : Ajouter un nouveau todo
  router.post("/api/todoList", (req, res) => {
    const newItem = req.body;
    const query = "INSERT INTO todo SET ?";
    db.query(query, newItem, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'ajout du todo :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'ajout du todo" });
      }
      newItem.id = result.insertId;
      res.json(newItem);
    });
  });

  // Route de mise à jour (PUT) : Mettre à jour un todo existant
  router.put("/api/todoList/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    const query = "UPDATE todo SET ? WHERE id = ?";
    db.query(query, [updatedItem, itemId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du todo :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour du todo" });
      }
      res.json(updatedItem);
    });
  });

  // Route de suppression (DELETE) : Supprimer un todo
  router.delete("/api/todoList/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const query = "DELETE FROM todo WHERE id = ?";
    db.query(query, itemId, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du todo :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la suppression du todo" });
      }
      res.json({ message: "Élément supprimé avec succès" });
    });
  });

  return router;
};
