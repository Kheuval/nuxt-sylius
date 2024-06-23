import { useShopUserRepository } from "~/src/Auth/server/repository/ShopUserRepository";
import { protectRoute } from "~/src/Auth/server/utils/protectRoute";

export default defineEventHandler(async (event) => {
  const session = await protectRoute(event);

  const { findOneByCustomerId } = useShopUserRepository();

  return await findOneByCustomerId(session.userId);
});
