export const LOAD_COMPANY       = "loadCompany";
export const ADD_COMPANY        = "addCompany";
export const EDIT_COMPANY       = "editCompany";
export const DELETE_COMPANY     = "deleteCompany";
export const DETAIL_COMPANY     = "DETAIL_COMPANY";

export function loadCompany() {
    return {
        type : LOAD_COMPANY
    }
}

export function addCompany(name, phoneManager, emailManager, address, nameManager) {
    return {
        type : ADD_COMPANY,
        name : name,
        phoneManager : phoneManager,
        emailManager : emailManager,
        nameManager  : nameManager,
        address      : address
    }
}

export function editCompany(id, name, phoneManager, emailManager, nameManager, address, key ) {
    return {
        type : EDIT_COMPANY,
        id : id,
        name : name,
        phoneManager : phoneManager,
        emailManager : emailManager,
        nameManager  : nameManager,
        address      : address,
        key_edit     : key
    }
}

export function deleteCompany(id, key) {
    return {
        type : DELETE_COMPANY,
        id   : id,
        key_delete : key
    }

}
export function detailCompany(id, key) {
    return {
        type : DETAIL_COMPANY,
        id   : id,
        key : key
    }

}
