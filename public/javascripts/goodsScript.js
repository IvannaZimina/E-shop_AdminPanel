const cardContainerElem = document.querySelector('.cardContainer');
const blockLoginElem = document.querySelector('.blockLogin');
const userAuthNameElem = document.querySelector('.userAuthName');

const getInfoByGoodsID = async () => {

    const goodsId = 'url/id'

    const { data } = await axios.post('/goods/infoSession');
    return data;
}

const card = async () => {
    const { goodField } = await getInfoByGoodsID();

    const html = `
        <div class="imageProd">
            <img src="${goodField.imageSrc.srcName}" alt="${goodField.result._id}">
        </div>
        <div class="description">
            <div class="nameProd"><p>${goodField.result.name}</p></div>
            <div class="priceProd"><p>Стоимость:${goodField.result.price}</p></div>
            <div class="sizeProd"><p>Размер: ${goodField.size}</p></div>
            <div class="enterprizeProd"><p>Производитель: ${goodField.enter.name}</p></div>
            <div class="enterprizeProd"><p>Страна: ${goodField.enter.country}</p></div>
            <div class="buyLink"><a href="${goodField.result._id}" >BUY</a></div>
        </div>
    `;

    cardContainerElem.innerHTML = html;
};

const user = async () => {
    const infoSession = await getInfoByGoodsID();

    if(infoSession.status === 'client not declare') {
        blockLoginElem.classList.remove('hidden');
        return;
    }
    else if(infoSession.status === 'ok') {
        const html = `<p>${infoSession.userName.payload.profile.nameUser}</p>`
        userAuthNameElem.innerHTML = html;
        userAuthNameElem.classList.remove('hidden');
        return;
    }
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
    else if( data.user.status === 'ok') {
        blockLoginElem.classList.add('hidden');
        userAuthNameElem.innerHTML = `<p>${data.user.payload.profile.nameUser}</p>`;
        userAuthNameElem.classList.remove('hidden');
    }
    else {
        console.log( 'check mistakes' );
    }
});

const commentForm = document.forms.commentForm;
commentForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const { data } = await axios.post('/comment', formData);
    console.log(data);


})

const run = () => {
    card();
    user();
};
run();
