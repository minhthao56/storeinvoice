

class CompanyRepository {
  constructor({ utilsDB }) {
    this.utilsDB = utilsDB;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        taxcode text,
        name text,
        address text,
        email text,
        phone text,
        fax text,
        province text,
        district text,
        status int,
        createdate datetime,
        updatedate datetime
      )`
    return this.utilsDB.run(sql);
  }

  create(company, { 
    dateNow,
  }) {
    const { taxcode, name, address, email, phone, fax, province, district } = company;

    return this.utilsDB.run(
      `INSERT INTO company (taxcode, name, address, email, phone, fax, province, district, 
        status, createdate, updatedate)
      VALUES ($taxcode, $name, $address, $email, $phone, $fax, $province, $district, 
        $status, $createdate, $updatedate)`,
      {
        $taxcode: taxcode,
        $name: name,
        $address: address,
        $email: email,
        $phone: phone,
        $fax: fax,
        $province: province,
        $district: district,
        $status: 10,
        $createdate: dateNow,
        $updatedate: dateNow,
      });
  }

  update(company, { 
    dateNow,
  }) {
    const { id, taxcode, name, address, email, phone, fax, province, district } = company;

    return this.utilsDB.run(
      `UPDATE company 
      SET taxcode = $taxcode, name = $name, address = $address, email = $email, phone = $phone, fax = $fax, 
        province = $province, district = $district, status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $taxcode: taxcode,
        $name: name,
        $address: address,
        $email: email,
        $phone: phone,
        $fax: fax,
        $province: province,
        $district: district,
        $status: 10,
        $updatedate: dateNow,
      });
  }

  delete(id, { 
    taxcode,
    dateNow,
  }) {
    let condition = ``;

    if(id) {
      condition += ` and id = $id `;
    }

    if(taxcode) {
      condition += ` and taxcode = $taxcode `;
    }

    return this.utilsDB.run(
      `UPDATE company 
      SET status = $status, updatedate = $updatedate 
      WHERE ${condition}`,
      {
        $id: !id || id < 1 ? undefined : id,
        $taxcode: taxcode ? taxcode : undefined,
        $status: 90,
        $updatedate: dateNow,
      });
  }

  getById(filter) {
    filter = filter || {};

    let condition = ``;

    if(filter.id && filter.id > 0) {
      condition += ` and id = $id `;
    }

    if(filter.taxcode) {
      condition += ` and taxcode like $taxcode `;
    }

    return this.utilsDB.get(
      `SELECT id, taxcode, name, address, email, phone, fax, province, district, 
        status, createdate, updatedate 
      FROM company 
      WHERE status != 90 ${condition}`,
      {
        $id: filter.id,
        $taxcode: filter.taxcode,
      });
  }

  getList(filter) {
    filter = filter || {};

    let query =
      `SELECT id, taxcode, name, address, email, phone, fax, province, district, 
        status, createdate, updatedate
      FROM company 
      WHERE status != 90
      ORDER BY name ASC`

    return this.utilsDB.all(query);
  }

  checkExitsTaxCode(taxCode, id) {
    let query =
      `SELECT count(1) numExists 
      FROM company 
      WHERE status = 10 and taxcode like $taxcode and id != $id`;

      return this.utilsDB.get(query, {
        $id: id,
        $taxcode: taxCode,
      });
  }

  checkExitsName(name, id) {
    let query =
      `SELECT count(1) numExists 
      FROM company 
      WHERE status = 10 and name like $name and id != $id`;

      return this.utilsDB.get(query, {
        $id: id,
        $name: name,
      });
  }
}

module.exports = {
  CompanyRepository,
};