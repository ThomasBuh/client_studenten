class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if(this.cookieStatus() !== 'accept' && this.cookieStatus() !== 'reject') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.makeMetadata();
            this.showStatus();
            this.showContent();
            this.hideGDPR();  
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });  
    }

    makeMetadata(){
        var d = new Date();
        const metadata = {
            "datum": d.toLocaleDateString(),
            "tijd": d.toLocaleTimeString(),
        };
        localStorage.setItem('gdpr-consent-metadata', JSON.stringify(metadata));

    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',
            '.content-gdpr-reject',
            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.getElementById('content-gpdr-consent-status').innerHTML =
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {
        if (status) localStorage.setItem('gdpr-consent-choice', status);
        return localStorage.getItem('gdpr-consent-choice');
    }

    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }
}

const gdpr = new GDPR();

