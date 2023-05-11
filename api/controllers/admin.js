import { createClassicConnexion } from "../db.js";

export const isAdmin = async (userId) => {
    const con = await createClassicConnexion();

    try {
        const [rows] = await con.query(
            `SELECT ur.user_id, ur.role_id
            FROM user_roles ur
            WHERE ur.user_id = ? AND ur.role_id = 1;`,
            [userId]
        );

        if (rows.length > 0 && rows[0].role_name === "admin") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Erreur lors de la vérification du statut d'administrateur de l'utilisateur.`);
    } finally {
        con.end();
    }
};
