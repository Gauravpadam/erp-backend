import {
  createInfrastructure,
  deleteInfrastructureById,
  infrastructureList,
  updateInfrastructureById,
} from "#services/infrastructure";
import { logger } from "#util";

async function addInfrastructure(req, res) {
  const { name, type, wing, floor, capacity } = req.body;
  try {
    const newInfrastructure = await createInfrastructure(
      name,
      type,
      wing,
      floor,
      capacity,
    );
    res.json({
      res: `added infrastructure ${newInfrastructure.id}`,
      id: newInfrastructure.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateInfrastructure(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateInfrastructureById(id, data);
    res.json({ res: `updated infrastructure with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getInfrastructure(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const infralist = await infrastructureList(filter, limit, page);
    res.json({ res: infralist });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    res.json({ err: "Error while fetching the data" });
  }
}

async function deleteInfrastructure(req, res) {
  const { id } = req.params;
  try {
    await deleteInfrastructureById(id);

    res.json({ res: `Deleted infrastructure with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addInfrastructure,
  deleteInfrastructure,
  getInfrastructure,
  updateInfrastructure,
};
