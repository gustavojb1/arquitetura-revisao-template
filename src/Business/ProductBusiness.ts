import knex from "knex";

export class ProductBusiness {
  constructor() {}

  public getProducts = async (q: string | undefined) => {

    const db = knex({
        client: "sqlite3",
        connection: {
          filename: "./src/database/arquitetura.db",
        },
        useNullAsDefault: true,
        pool: {
          min: 0,
          max: 1,
          afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb);
          },
        },
      });

      

      if (q) {
        const productsDB = await db("products").select()
                .where("name", "LIKE", `%${q}%`)

        const brandsDB = await db("brands").select();

        const products = productsDB.map((productsDB) => {
          return {
            id: productsDB.id,
            name: productsDB.name,
            price: productsDB.price,
            brand: getBrand(productsDB.brand_id),
          };
        });

        function getBrand(brandId: string) {
          const brand = brandsDB.find((brandDB) => {
            return brandDB.id === brandId;
          });

          return {
            id: brand.id,
            name: brand.name,
          };
        }

        // res.status(200).send(products);
        return products
        
      } else {
        const productsDB = await db("products").select();

        const brandsDB = await db("brands").select();

        const products = productsDB.map((productsDB) => {
          return {
            id: productsDB.id,
            name: productsDB.name,
            price: productsDB.price,
            brand: getBrand(productsDB.brand_id),
          };
        });

        function getBrand(brandId: string) {
          const brand = brandsDB.find((brandDB) => {
            return brandDB.id === brandId;
          });

          return {
            id: brand.id,
            name: brand.name,
          };
        }

        // res.status(200).send(products);
        return products
      }
  };
}
