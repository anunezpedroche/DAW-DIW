export default class Rex {

    constructor(posicionY, posicionX) {
        this._posicionX = posicionX;
        this._posicionY = posicionY;
    }

    set posicionX(valorNuevo) {
        this._posicionX = valorNuevo;
    }

    set posicionY(valorNuevo) {
        this._posicionY = valorNuevo;
    }

    get posicionX() {
        return this._posicionX;
    }

    get posicionY() {
        return this._posicionY;
    }
}