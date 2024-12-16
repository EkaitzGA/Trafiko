
/**
 * Convierte coordenadas UTM a coordenadas geográficas (latitud/longitud)
 * @param {number|string} northing - Coordenada norte UTM
 * @param {number|string} easting - Coordenada este UTM
 * @returns {Array<number>|null} - Array con [latitud, longitud] o null si hay error
 */
export const convertUTMtoLatLng = (northing, easting) => {
    try {
        const north = parseFloat(northing);
        const east = parseFloat(easting);

        if (isNaN(north) || isNaN(east)) {
            console.error('Coordenadas UTM inválidas');
            return null;
        }

        const a = 6378137.0;  // Radio ecuatorial de la Tierra (WGS84)
        const f = 1 / 298.257223563;  // Achatamiento (WGS84)
        const k0 = 0.9996;  // Factor de escala
        const FE = 500000.0;  // False Easting

        const e2 = 2 * f - f * f;  // Primera excentricidad al cuadrado
        const n = f / (2 - f);
        const n2 = n * n;
        const n3 = n2 * n;
        const n4 = n3 * n;

        const x = east - FE;
        const y = north;
        const lambda0 = -3 * Math.PI / 180.0;  // Meridiano central para la zona 30N
        const M = y / k0;
        const mu = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));

        const phi1 = mu + (3 * n / 2 - 27 * n3 / 32) * Math.sin(2 * mu) +
            (21 * n2 / 16 - 55 * n4 / 32) * Math.sin(4 * mu) +
            (151 * n3 / 96) * Math.sin(6 * mu) +
            (1097 * n4 / 512) * Math.sin(8 * mu);

        const sin_phi = Math.sin(phi1);
        const cos_phi = Math.cos(phi1);
        const tan_phi = sin_phi / cos_phi;

        const ep2 = e2 / (1 - e2);
        const N = a / Math.sqrt(1 - e2 * sin_phi * sin_phi);
        const R = N * (1 - e2) / (1 - e2 * sin_phi * sin_phi);

        const dd = x / (N * k0);
        const d2 = dd * dd;
        const d3 = d2 * dd;
        const d4 = d3 * dd;
        const d5 = d4 * dd;
        const d6 = d5 * dd;

        let lat = phi1 - (tan_phi * d2 / (2 * R * N)) *
            (1 - d2 / 12 * (5 + 3 * tan_phi * tan_phi + ep2 * (1 - 9 * tan_phi * tan_phi)));

        let lon = lambda0 + (dd - d3 / 6 * (1 + 2 * tan_phi * tan_phi) +
            d5 / 120 * (5 - 28 * tan_phi * tan_phi + 24 * Math.pow(tan_phi, 4))) / cos_phi;

        // Convertir de radianes a grados
        lat = lat * 180 / Math.PI;
        lon = lon * 180 / Math.PI;

        return [lat, lon];
    } catch (error) {
        console.error('Error en la conversión UTM:', error);
        return null;
    }
};

/**
 * Verifica si las coordenadas UTM son válidas
 * @param {number|string} northing - Coordenada norte UTM
 * @param {number|string} easting - Coordenada este UTM
 * @returns {boolean} - true si las coordenadas son válidas
 */
export const isValidUTM = (northing, easting) => {
    const north = parseFloat(northing);
    const east = parseFloat(easting);
    
    return !isNaN(north) && !isNaN(east);
};