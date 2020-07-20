const db = require('./db');
var connection;
class QueryHelper {

    static create_all_tables() {
        console.log('Creating all schemas!');
        var category_table = 'create table IF NOT EXISTS rb_category(p_category_name VARCHAR(40), p_category_desc  VARCHAR(40), PRIMARY KEY(p_category_name));';
        var sub_category_table = 'create table IF NOT EXISTS rb_sub_category(p_subcategory_name VARCHAR(40), p_subcategory_desc  VARCHAR(40), PRIMARY KEY(p_subcategory_name));';
        var brand_table = 'create table IF NOT EXISTS rb_brand(p_brand_name VARCHAR(40), p_brand_desc  VARCHAR(40), PRIMARY KEY(p_brand_name));';
        var uom_table = 'create table IF NOT EXISTS rb_uom(p_unit_code VARCHAR(40) NOT NULL, p_unit_desc  VARCHAR(40), PRIMARY KEY(p_unit_code), UNIQUE (p_unit_code));';
        var gst_table = 'create table IF NOT EXISTS rb_gsttax(tax_division VARCHAR(40), gst_tax_desc  VARCHAR(40) NOT NULL, tax_type VARCHAR(40), cgst decimal(5,2),sgst decimal(5,2), igst  decimal(5,2),PRIMARY KEY(gst_tax_desc));';
        var cess_table = 'create table IF NOT EXISTS rb_cesstax(other_tax_desc  VARCHAR(40) NOT NULL, tax_perc decimal(5,2), PRIMARY KEY(other_tax_desc));';
        var product_table = 'create table IF NOT EXISTS rb_product_details (p_id INT NOT NULL AUTO_INCREMENT,hsn_code BIGINT NOT NULL,p_name VARCHAR(40) NOT NULL,barcode_type VARCHAR(40) NOT NULL, barcode VARCHAR(40) NOT NULL,p_category_name VARCHAR(40),p_subcategory_name VARCHAR(40),p_brand_name VARCHAR(40),p_size VARCHAR(40),p_unit_code VARCHAR(40),p_style VARCHAR(40), mrp DOUBLE,cost_price DOUBLE,selling_price DOUBLE,discount DOUBLE,purchase_tax VARCHAR(40),sales_tax VARCHAR(40),cess_tax VARCHAR(40),min_qty INT,max_qty INT,reorder_qty INT, PRIMARY KEY(p_id, p_name), FOREIGN KEY (p_category_name) REFERENCES rb_category(p_category_name), FOREIGN KEY (p_subcategory_name) REFERENCES rb_sub_category(p_subcategory_name), FOREIGN KEY (p_brand_name) REFERENCES rb_brand(p_brand_name),  FOREIGN KEY (p_unit_code) REFERENCES rb_uom(p_unit_code), UNIQUE(p_name));';
        //var product_table = 'create table IF NOT EXISTS rb_product_details (p_id INT NOT NULL AUTO_INCREMENT,hsn_code BIGINT NOT NULL,p_name VARCHAR(40) NOT NULL,barcode_type VARCHAR(40) NOT NULL, barcode VARCHAR(40) NOT NULL,p_category_name VARCHAR(40),p_subcategory_name VARCHAR(40),p_brand_name VARCHAR(40),p_size VARCHAR(40),p_unit_code VARCHAR(40),p_style VARCHAR(40), mrp DOUBLE,cost_price DOUBLE,selling_price DOUBLE,discount DOUBLE,purchase_tax VARCHAR(40),sales_tax VARCHAR(40),cess_tax VARCHAR(40),min_qty INT,max_qty INT,reorder_qty INT, PRIMARY KEY(p_id, p_name), FOREIGN KEY (p_category_name) REFERENCES rb_category(p_category_name), FOREIGN KEY (p_subcategory_name) REFERENCES rb_sub_category(p_subcategory_name), FOREIGN KEY (p_brand_name) REFERENCES rb_brand(p_brand_name),  FOREIGN KEY (p_unit_code) REFERENCES rb_uom(p_unit_code), FOREIGN KEY (purchase_tax) REFERENCES rb_gsttax(gst_tax_desc), FOREIGN KEY (sales_tax) REFERENCES rb_gsttax(gst_tax_desc),FOREIGN KEY (cess_tax) REFERENCES rb_cesstax(other_tax_desc), UNIQUE(p_name));';
        try {
            connection = db.dbConnection();

            connection.query(category_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("Category Table created : " + JSON.stringify(rows));
            });

            connection.query(sub_category_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("SubCategory Table created : " + JSON.stringify(rows));
            });
            
            connection.query(brand_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("Brand Table created : " + JSON.stringify(rows));
            });
            connection.query(gst_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("GST Table created : " + JSON.stringify(rows));
            });

            connection.query(cess_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("CESS Table created : " + JSON.stringify(rows));
            });

            connection.query(uom_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("UOM Table created : " + JSON.stringify(rows));
            });

            connection.query(product_table, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log("Product Table created : " + JSON.stringify(rows));
            });
             // Close the connection
             connection.end(function(){
                // The connection has been closed
            });
        } catch (err) {
            console.log(err);
        }
    }

    static insert_category(categry) {
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_category SET ?', categry, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Inserted : " + JSON.stringify(rows));
                location.reload(); 
            });
            // Close the connection
            connection.end(function(){
                // The connection has been closed
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_category() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_category;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
            connection.end(function(){
                // The connection has been closed
            });
        } catch (err) {
            console.log(err);
        }
    }

    static insert_subcategory(sub_category) {
        console.log('Inserting SubCategory');
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_sub_category SET ?', sub_category, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Inserted : " + JSON.stringify(rows));
                location.reload(); 
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_subcategory() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_sub_category;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }

    static insert_brand(brand) {
        console.log('Inserting Brand');
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_brand SET ?', brand, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Inserted : " + JSON.stringify(rows));
                location.reload(); 
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_brand() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_brand;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }

    static insert_unit(punit) {
        console.log('Inserting Unit');
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_uom SET ?', punit, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Inserted : " + JSON.stringify(rows));
                location.reload(); 
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_unit() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_uom;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }

    static insert_productdetails(productdetails) {
        console.log('Inserting Product Details');
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_product_details SET ?', productdetails, function (err, rows) {
                if (err)
                    console.log(err.stack);
                alert(" Data Inserted : " + JSON.stringify(rows));
                window.location.href="ProductViwer.html";
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_productdetail() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_product_details;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }

    static getDistinctField(tabName,keyLst,id,callbackfun){
        try {
            connection = db.dbConnection();
            connection.query("select "+keyLst+" from "+tabName+";", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                callbackfun(rows,id,keyLst);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }


    static insert_gsttax(gsttax) {
        console.log('Inserting GST');
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_gsttax SET ?', gsttax, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Inserted : " + JSON.stringify(rows));
                location.reload(); 
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_gsttax() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_gsttax;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }

    static insert_cesstax(cesstax) {
        console.log('Inserting CESSTax');
        try {
            connection = db.dbConnection();
            connection.query('INSERT INTO rb_cesstax SET ?', cesstax, function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Inserted : " + JSON.stringify(rows));
                location.reload(); 
            });
        } catch (err) {
            console.log(err);
        }
    }

    static get_all_cesstax() {
        try {
            connection = db.dbConnection();
            connection.query("select * from rb_cesstax;", function (err, rows) {
                if (err)
                    console.log(err.stack);
                console.log(" Data Collected : " + JSON.stringify(rows));
                drawTable(rows);
                return rows;
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = QueryHelper;

