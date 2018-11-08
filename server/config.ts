/**
 * Конфиг основных параметров приложения.
 *
 * @prop {number} port Порт, на котором запускается приложение.
 */
interface IConfig {
    port: number;
}

const config: IConfig = {
    port: 8000
};

module.exports = config;
