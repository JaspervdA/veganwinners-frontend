# Veganwinners-frontend
The frontend repository for our recipe sharing website.

## Start locally
First, change the content of your `node_modules/grommet/scss/vanilla/_vanilla.defaults.scss`:
```
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
/* geel, #EAB126
rood, #F24C4E
groen, #1B7B34*/

$brand-color: #1B7B34;
$brand-neutral-colors: (#0A64A0, #DC2878, #501EB4, #49516F);
$brand-accent-colors: (#00CCEB, #FF7D28);
$brand-link-color: #FFFFFF;
$brand-status-colors: (
  critical: #FF324D,
  error: #FF324D,
  warning: #FFD602,
  ok: #8CC800,
  unknown: #a8a8a8,
  disabled: #a8a8a8
) !default;
$brand-grey-colors: (#000001, #333333, #3B3B3B, #434343, #666666);

$button-secondary-color: nth($brand-neutral-colors, 2);

$brand-font-family: 'Work Sans', Arial, sans-serif;
$brand-large-number-font-family: 'Work Sans', Arial, sans-serif;
$code-font-family: Consolas, Menlo, 'DejaVu Sans Mono', 'Liberation Mono', monospace;
$text-strong-font-weight: 500;

$fonts-path: "https://fonts.gstatic.com/s/worksans/v2";

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  src:
    local('Work Sans Light'),
    local('WorkSans-Light'),
    url("#{$fonts-path}/FD_Udbezj8EHXbdsqLUplxampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  src:
    local('Work Sans'),
    local('WorkSans-Regular'),
    url("#{$fonts-path}//ElUAY9q6T0Ayx4zWzW63VJBw1xU1rKptJj_0jans920.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  src:
    local('Work Sans Medium'),
    local('WorkSans-Medium'),
    url("#{$fonts-path}/Nbre-U_bp6Xktt8cpgwaJBampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  src:
    local('Work Sans SemiBold'),
    local('WorkSans-SemiBold'),
    url("#{$fonts-path}/z9rX03Xuz9ZNHTMg1_ghGRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}

@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 700;
  src:
    local('Work Sans Bold'),
    local('WorkSans-Bold'),
    url("#{$fonts-path}/4udXuXg54JlPEP5iKO5AmRampu5_7CjHW5spxoeN3Vs.woff2") format('woff2');
}
```

Now you can run:
```
npm install
npm start
```

## To production
First, make a build:
```
npm run build
```
Commit this to github. Now, on the server, checkout the new branch / pull the new master. Tada ;)
