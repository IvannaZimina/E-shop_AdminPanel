const centerContainerElem = document.querySelector('.centerContainer');
const userAuthNameElem = document.querySelector('.userAuthName');
const blockLoginElem = document.querySelector('.blockLogin');

const getInform = async () => {
    const { data } = await axios.get('/admin/server');
    return data;
};

const getImageSrcById = async (id) => {
    const { images } = await getInform();
    const imageSrc = images.find( val => val._id === id );
    return imageSrc;
};

const productCard = async () => {
    const { product } = await getInform();
    
    let list = '';
    product.forEach( async (item) => {

        const imageSrc = await getImageSrcById(String(item.image));
        const html = `
            <div class="cardContainer" data-id="${item._id}">
                <div class="imageProd">
                    <img
                        src="${imageSrc.srcName}"
                        alt="${item.name}">
                </div>
                <div class="nameProd"><p>${item.name}</p></div>
                <div class="priceProd"><p>price: ${item.price}</p></div>
                <div class="buyLink"><a href="/goods/${item._id}" >BUY</a></div>
            </div>
        `;
        list = `${list}${html}`;
        centerContainerElem.innerHTML = list;
    });
};

const signUpForm = document.forms.signUpForm;
signUpForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/signIn', formData);
    console.log(data);

    if( data.user.status === 'client not declare' ) {
        window.location.href = '/login';
    }
    else if (data.user.status === 'invalid password') {
        window.location.href = '/';
    }
    else if( data.user.payload.profile.status === 'ok') {
        blockLoginElem.classList.add('hidden');
        userAuthNameElem.innerHTML = `<p>${data.user.payload.profile.nameUser}</p>`;
        userAuthNameElem.classList.remove('hidden');
    }
    else {
        console.log( 'check mistakes' );
    }

});

const userCheckBySessionID = async () => {
    const { data } = await axios.post('/userCheck');
    console.log(data);

    if( data.status === 'client not declare' ) {
        blockLoginElem.classList.remove('hidden');
    }
    else if( data.userName.payload.profile.status === 'ok') {
        blockLoginElem.classList.add('hidden');
        userAuthNameElem.innerHTML = `<p>${data.userName.payload.profile.nameUser}</p>`;
        userAuthNameElem.classList.remove('hidden');
    }
    else {
        console.log( 'check mistakes' );
    };
};




const run = async () => {
    await productCard();
    await userCheckBySessionID();
};
run();
