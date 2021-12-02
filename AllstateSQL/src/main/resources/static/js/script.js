/* left navigation bar js */

$(document).on('click', '.navigation ul li', function () {
    $(this).addClass('active').siblings().removeClass('active')
})

$(document).on('click', '.navigation ul ul li', function () {
    $(this).removeClass('active').siblings()
})



function navtogg() {
    const navtog = document.querySelector('.navigation');
    const usepro = document.querySelector('.user-profile');
    const homepa = document.querySelector('.home_page');
    const navlogo = document.querySelector('.logo');
    const navlogo2 = document.querySelector('.logo2');
    const title = document.querySelector('.title');
   
    navtog.classList.toggle('active');
    usepro.classList.toggle('active');
    homepa.classList.toggle('active');
    navlogo.classList.toggle('active');
    navlogo2.classList.toggle('active');
    $('.title').toggle('hid');

};

/* left navigation bar js end */

/* user bar */
function userprofile() {
    const drop = document.querySelector('.user-menu');
    drop.classList.toggle('active');
};
/* user page */

function adduserfun() {
    var userreg = document.getElementById("userreg");

    if (userreg.style.display == "none") {
        userreg.style.display = "block";
    }
}
function adduserfuncan() {
    var userreg = document.getElementById("userreg");

    if (userreg.style.display == "block") {
        userreg.style.display = "none";
    }
}

/* assect js */
function tog() {
    var num = document.getElementById("assect_num");
    var char = document.getElementById("assect_chart");
    if (char.style.display == "none") {
        char.style.display = "block";
        num.style.display = "none";

    }
    else {
        num.style.display = "block";
        char.style.display = "none";
    }
};

/* material */

function matreg() {
    var addBrand = document.getElementById("addBrand");
    var addCat = document.getElementById("addCat");
    var matreg = document.getElementById("MaterReg");

    if (matreg.style.display == "none") {
        matreg.style.display = "block";
    }
    else {
        matreg.style.display == "none"
        addCat.style.display = "none";
        addBrand.style.display = "none";
    }
};

function regcan() {
    var addBrand = document.getElementById("addBrand");
    var addCat = document.getElementById("addCat");
    var matreg = document.getElementById("MaterReg");

    if (matreg.style.display == "none") {
        matreg.style.display = "block";
    }
    else {
        matreg.style.display = "none";
    }
};

function addbrand() {
    var addBrand = document.getElementById("addBrand");
    var addCat = document.getElementById("addCat");
    var matreg = document.getElementById("MaterReg");

    if (addBrand.style.display == "none") {
        addBrand.style.display = "block";
        addCat.style.display = "none"
    }
    else {
        addBrand.style.display = "none";
        addCat.style.display = "none"
        matreg.style.display = "block"
    }
};

function addbrandcan() {
    var addBrand = document.getElementById("addBrand");
    var addCat = document.getElementById("addCat");
    var matreg = document.getElementById("MaterReg");

    if (addBrand.style.display == "none") {
        addBrand.style.display = "block";
    }
    else {
        addBrand.style.display = "none";
        addCat.style.display = "none"
        matreg.style.display = "block"
    }
};

function addcate() {
    var addBrand = document.getElementById("addBrand");
    var addCat = document.getElementById("addCat");
    var matreg = document.getElementById("MaterReg");

    if (addCat.style.display == "none") {
        addCat.style.display = "block";
        addBrand.style.display = "none"
    }
    else {
        addCat.style.display = "none";
        matreg.style.display = "block";
        addBrand.style.display = "none";
    }
}

function addsupfun() {
    var sup = document.getElementById("supp");

    if (sup.style.display == "none") {
        sup.style.display = "block";
    }
    else {
        sup.style.display = "none";
    }
}


/* employee */
function empregfun() {
    var empreg = document.getElementById("empreg");

    if (empreg.style.display == "none") {
        empreg.style.display = "block";
    }
}
function empregfuncan() {
    var empreg = document.getElementById("empreg");

    if (empreg.style.display == "block") {
        empreg.style.display = "none";
    }
}

/* storage location start */

function storloclink() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (storlocklink.style.display == "none") {
        storlocklink.style.display = "block";
        storloc.style.display = "none";
        warereg.style.display = "none";
        rackreg.style.display = "none";
    }
}

function storloclinkcan() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (storlocklink.style.display == "block") {
        storlocklink.style.display = "none";
    }
}

function addstormate() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (storloc.style.display == "none") {
        storloc.style.display = "block";
        storlocklink.style.display = "none";
        warereg.style.display = "none";
        rackreg.style.display = "none";
    }
}

function addstormatecan() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (storloc.style.display == "block") {
        storloc.style.display = "none";
    }
}

function addnewware() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (warereg.style.display == "none") {
        warereg.style.display = "block";
        storlocklink.style.display = "none";
        storloc.style.display = "none";
        rackreg.style.display = "none";
    }
}

function addnewwarecan() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (warereg.style.display == "block") {
        warereg.style.display = "none";
        storloc.style.display = "block";
    }
}

function addnewrack() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (rackreg.style.display == "none") {
        rackreg.style.display = "block";
        storlocklink.style.display = "none";
        storloc.style.display = "none";
        warereg.style.display = "none";
    }
}


function addnewrackcan() {
    var storlocklink = document.getElementById("storLocLink");
    var storloc = document.getElementById("StorLoc");
    var warereg = document.getElementById("Warereg");
    var rackreg = document.getElementById("rackreg");

    if (rackreg.style.display == "block") {
        rackreg.style.display = "none";
        storloc.style.display = "block";
    }
}

/* upload js */
function desk() {
    var select = document.getElementById("upselect");
    var option = select.options[select.selectedIndex].value;
    var desk = document.getElementById("Desk");
    var Project = document.getElementById("Project");
    var Room = document.getElementById("Room");
    var Department = document.getElementById("Department");
    var Brand = document.getElementById("Brand");
    var Branch = document.getElementById("Branch");
    var Designation = document.getElementById("Designation");
    var WorkLocation = document.getElementById("WorkLocation");
    var CostCenter = document.getElementById("CostCenter");
    var Subsidiary = document.getElementById("Subsidiary");
    var Supplier = document.getElementById("Supplier");
    var Employee = document.getElementById("Employee");
    var Materials = document.getElementById("Materials");

    if (option == "1") {
        desk.style.display = "block";
        Project.style.display = "none";
        Room.style.display = "none";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";

    }

    else if (option == "2") {
        desk.style.display = "none";
        Project.style.display = " block";
        Room.style.display = "none";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "3") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = " block";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "4") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = " block";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "5") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = " none";
        Department.style.display = "none";
        Brand.style.display = " block";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "6") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = " block";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "7") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = " none";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = " block";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "8") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "  none";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "block";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "9") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "block";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "10") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "block";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
    else if (option == "11") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "block";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }

    else if (option == "12") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none ";
        Materials.style.display = "block";
    }

    else if (option == "13") {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = " block";
        Materials.style.display = "none";
    }

    else {
        desk.style.display = "none";
        Project.style.display = "none";
        Room.style.display = "none ";
        Department.style.display = "none";
        Brand.style.display = "none";
        Branch.style.display = "none";
        Designation.style.display = "none";
        WorkLocation.style.display = "none";
        CostCenter.style.display = "none";
        Subsidiary.style.display = "none";
        Supplier.style.display = "none";
        Employee.style.display = "none";
        Materials.style.display = "none";
    }
}


/* device and location */
function mapdev() {
    var mapdev = document.getElementById("mapdev");

    if (mapdev.style.display == "none") {
        mapdev.style.display = "block";
    }
}
function mapdevcan() {
    var mapdev = document.getElementById("mapdev");

    if (mapdev.style.display == "block") {
        mapdev.style.display = "none";
    }
}

function maploc() {
    var maploc = document.getElementById("maploc");

    if (maploc.style.display == "none") {
        maploc.style.display = "block";
    }
}
function maploccan() {
    var maploc = document.getElementById("maploc");

    if (maploc.style.display == "block") {
        maploc.style.display = "none";
    }
}


function mapdevloc() {
    var mapdevloc = document.getElementById("mapdevloc");

    if (mapdevloc.style.display == "none") {
        mapdevloc.style.display = "block";
    }
}
function mapdevloccan() {
    var mapdevloc = document.getElementById("mapdevloc");

    if (mapdevloc.style.display == "block") {
        mapdevloc.style.display = "none";
    }
}

/* purchase */
function adpurc() {
    var adpurc = document.getElementById("adpurc");

    if (adpurc.style.display == "none") {
        adpurc.style.display = "block";
    }
}
function adpurccan() {
    var adpurc = document.getElementById("adpurc");

    if (adpurc.style.display == "block") {
        adpurc.style.display = "none";
    }
}

function lease() {
    var purc = document.getElementById("purctype");
    var purtyp = purc.options[purc.selectedIndex].value;
    var leadiv = document.getElementById("leasediv");
    if (purtyp == "2") {
        leadiv.style.display = "block";
    }
    else {
        leadiv.style.display = "none";
    }

}

/* grn */

function cregrn() {
    var grnreg = document.getElementById("grnreg");

    if (grnreg.style.display == "none") {
        grnreg.style.display = "block";
    }
}
function cregrnfun() {
    var grnreg = document.getElementById("grnreg");

    if (grnreg.style.display == "block") {
        grnreg.style.display = "none";
    }
}

/* Employee access */

function addempacc() {
    var empacc = document.getElementById("empacc");

    if (empacc.style.display == "none") {
        empacc.style.display = "block";
    }
}
function empaccan() {
    var empacc = document.getElementById("empacc");

    if (empacc.style.display == "block") {
        empacc.style.display = "none";
    }
}

/* tag/Qr */


function regtypfunc() {
    var regitype = document.getElementById("regtype");
    var reg = regitype.options[regitype.selectedIndex].value;
    var blereg = document.getElementById("blereg");
    var rfidreg = document.getElementById("rfidreg");
    var qrreg = document.getElementById("qrreg");

    if (reg == "1") {
        blereg.style.display = "block";
        rfidreg.style.display = "none";
        qrreg.style.display = "none";

    }
    else if (reg == "2") {
        rfidreg.style.display = "block";
        blereg.style.display = "none";
        qrreg.style.display = "none";
    }
    else if (reg == "3") {
        rfidreg.style.display = "none";
        blereg.style.display = "none";
        qrreg.style.display = "block";
    }
    else {
        rfidreg.style.display = "none";
        blereg.style.display = "none";
        qrreg.style.display = "none";
    }
}
function regtypcan() {
    var blereg = document.getElementById("blereg");
    var rfidreg = document.getElementById("rfidreg");
    var qrreg = document.getElementById("qrreg");
    if (blereg.style.display == "block") {
        blereg.style.display = "none"
    }
    else if (rfidreg.style.display == "block") {
        rfidreg.style.display = "none"
    }
    else if (qrreg.style.display == "block") {
        qrreg.style.display = "none"
    }
    else {
        qrreg.style.display = "none"
        rfidreg.style.display = "none"
        blereg.style.display = "none"
    }

}
