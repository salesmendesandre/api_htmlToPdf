# htmlToPdf_api

## Install wkhtmltopdf
```
sudo wget https://builds.wkhtmltopdf.org/0.12.1.3/wkhtmltox_0.12.1.3-1~bionic_amd64.deb
sudo dpkg -i wkhtmltox_0.12.1.3-1~bionic_amd64.deb
sudo apt-get install -f
sudo ln -s /usr/local/bin/wkhtmltopdf /usr/bin
sudo ln -s /usr/local/bin/wkhtmltoimage /usr/bin
```

## Clone and Install Dependencies
```
git clone https://github.com/salesmendesandre/api_htmlToPdf.git
cd api_htmlToPdf
npm install
```
## Run the API
```
node server.js
```
