const userAccsStore = ({email, isGoogle}) => {
    const accs = !!localStorage.getItem("accs") ? JSON.parse(localStorage.getItem("accs")) : [];
    
    for (let i = 0; i < accs.length; i++) {

        if (accs[i].email === email) { 
            accs[i].lastLogin = new Date();
            
            return accs;

        }

    }
    

    accs.push({email, lastLogin: new Date(), isGoogle});
    
    return accs;
}

export default userAccsStore;