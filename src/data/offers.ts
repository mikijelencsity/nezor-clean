// Árak és ajánlatok egy helyen (a kérdéssor és az árak oldal is innen olvashat).

/** a Facebook- és Instagram-hirdetéskezelés havidíja, Ft */
export const AD_FEE_HUF = 79000;

/** ha velünk készül a weboldal vagy a webshop: ennyi kedvezmény jár az első havi hirdetéskezelés díjából */
export const WEB_AD_DISCOUNT = 0.5;

export const AD_FEE_DISCOUNTED_HUF = Math.round(AD_FEE_HUF * (1 - WEB_AD_DISCOUNT));
