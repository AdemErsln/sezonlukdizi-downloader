const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');
const readline = require('readline');
const Path = require('path')
const clc = require('cli-color');

let deneme = 1;


const options = new firefox.Options();
options.addExtensions("./vpn.xpi")
options.headless();
const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();


async function connect_vpn(uuid) {
  await driver.get("moz-extension://" + uuid + "/popup/index.html");

  while (true) {
    try {
      const element = await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div[2]/button[2]'));
      await element.click();
      break;  // Döngüyü sonlandır
    } catch (error) {
      // XPath hala bulunamadıysa veya hata oluştuysa beklemeye devam et
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle
      continue;
    }
  }
  driver.executeScript("document.getElementsByClassName('agreement_agree')[0].click() ");


  while (true) {
    try {
      const select = await driver.findElement(By.xpath("/html/body/div/div/div[3]/div[2]/div/div[1]/input"));
      await select.click();
      const optionsButton = await driver.findElement(By.xpath("/html/body/div/div/div[3]/div[2]/div/div[2]/div/ul/li[57]"));

      await optionsButton.click();

      break;  // Döngüyü sonlandır
    } catch (error) {
      // XPath hala bulunamadıysa veya hata oluştuysa beklemeye devam et
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle
      continue;
    }
  }

  get_links(name, sezon, basla, bitir);




}
function extract_text(text) {

  const regex = /^[^\d]+/;

  const result = text.match(regex);
  const extractedText = result ? result[0].trim() : "";

  return extractedText
}
function log(message, type) {

  switch (type) {
    case "error":
      console.log(clc.red(message))
      break;
    case "info":
      console.log(clc.blue(message))
      break;
    case "success":
      console.log(clc.green(message));
      break;
    default:

      break;
  }

}

console.clear();



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let download_links = [];
let t = 0;
let length = 0;



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function get_links(dizi, sezon, basla, bitir) {
  console.log(dizi);
  console.log("Başlıyor..")
  length = bitir;

  var login = 1;
  try {
    for (let i = basla; i <= bitir; i++) {
      await driver.get(`https://sezonlukdizi3.com/${dizi}/dublaj/${sezon}-sezon-${i}-bolum.html`);
      console.log("Sayfa Açıldı..")


      while (true) {
        try {
          const play_element = await driver.findElement(By.css('#embed > i'))
          await play_element.click();
          break;  // Döngüyü sonlandır
        } catch (error) {
          // XPath hala bulunamadıysa veya hata oluştuysa beklemeye devam et
          console.log("Ahh göremiyorum..");
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle
          continue;
        }
      }

      while (true) {
        try {
          const element_alternatif_div = await driver.findElement(By.xpath('//*[@id="alternatif"]'));
          element_alternatif_div.click();
          break;  // Döngüyü sonlandır
        } catch (error) {
          // XPath hala bulunamadıysa veya hata oluştuysa beklemeye devam et
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle
          continue;
        }
      }
      while (true) {
        try {
          log("Embed linki alınıyor..", "info")
          const element_alternatif = await driver.findElement(By.xpath('//div[@class="menu"]/div[contains(@class, "item") and text()="StreamSB"]'));
          await element_alternatif.click();
          break;  // Döngüyü sonlandır
        } catch (error) {
          // XPath hala bulunamadıysa veya hata oluştuysa beklemeye devam et
          deneme++;
          if (deneme > 3) {
            get_links(name, sezon, basla, bitir);
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniye bekle

          continue;
        }
      }


      await sleep(1000);
      const test = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[1]/div[5]/iframe'));
      const url = await test.getAttribute("src")
      log("Embed linki alındı", "info")

      await get_download_url(dizi + " " + sezon + " Sezon" + " " + i + " Bölüm", url);
    }
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    //await driver.quit();
  }
}

async function get_download_url(name, url) {
  console.log("İndirme Sayfasına gidiliyor..")

  const options = new firefox.Options();
  options.addExtensions("./ublock.xpi");
  options.headless();

  try {
    const driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();

    const id = url.split('/').pop().split('.')[0];
    var new_url = "https://lvturbo.com/d/" + id + ".html";

    await driver.get(new_url);

    const sd_button = await driver.findElement(By.xpath("/html/body/main/div/div/div/div[3]"));
    await sd_button.click();
    await sleep(3000)
    log("Robot kontrolü..", "info");
    const human_button = await driver.findElement(By.xpath("/html/body/main/div/div/center/form/div/button"))
    await human_button.click();

    await sleep(4000);
    const xpath = "/html/body/main/div/div/div/a";
    await driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
    const download_link = await driver.findElement(By.xpath("/html/body/main/div/div/div/a"))
    console.log("Robot kontrolü Geçildi");

    console.log("İndirme linki alındı " + await download_link.getAttribute("href"))
    download_links.push({ name: name, url: await download_link.getAttribute("href") })

  } catch (error) {
    console.log(error);
  } finally {
    console.log("Bitti");
    t = t + 1
    menu();
  }
}

function menu() {
  console.log(length);

  if (t == length) {
    var x = 0;

    console.log("Birini seçiniz");

    var stdin = process.openStdin();

    soruSor("1)Hepsini indir\n2)Json Olarak Kaydet(output.json) ").then((answer) => {
      if (answer == "1") {
        download();
      }
      else if (answer == "2") {
        save();
      }

      else {
        log("Hatalı giriş", "error")
        menu();
      }
    })


  }
  else {


  }

}


function save() {
  const name = extract_text(download_links[0].name);

  fs.writeFileSync(name + '.json', JSON.stringify(download_links), 'utf8');
}

const ProgressBar = require('progress')
const Axios = require('axios')

async function download() {


  for (let i = 0; i < download_links.length; i++) {
    const name = extract_text(download_links[i].name);

    const url = download_links[0].url;

    console.log('Connecting …')
    const { data, headers } = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    const totalLength = headers['content-length']

    console.log(download_links[i].name)
    const progressBar = new ProgressBar('-> indiriliyor [:bar] :percent :etas', {
      width: 40,
      complete: '=',
      incomplete: ' ',
      renderThrottle: 1,
      total: parseInt(totalLength)
    })

    kontrolVeOlustur("./" + name);

    const writer = fs.createWriteStream(
      Path.resolve(__dirname, name, download_links[i].name + ".mp4")
    )

    data.on('data', (chunk) => progressBar.tick(chunk.length))
    data.pipe(writer)
  }


}

//menu();
//get_links("regular-show", 1, 1, 1);


async function test() {

  console.log("Başlıyor..")
  const options = new firefox.Options();
  options.addExtensions("./ublock.xpi");

  const driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();


  //await driver.get(`https://sezonlukdizi3.com/regular-show/dublaj/1-sezon-1-bolum.html`);

  await driver.get('about:debugging#/runtime/this-firefox');
  const extensions = await driver.findElements(By.css('.card.extension'));
  for (const extension of extensions) {
    const idElement = await extension.findElement(By.css('.item-header .extension-id'));
    const id = await idElement.getText();
    console.log(`Extension ID: ${id}`);
  }



}


async function getAllExtensionUuids() {


  const capabilities = await driver.getCapabilities();
  const profilePath = capabilities.get('moz:profile');
  const userPrefsFilePath = profilePath + '/prefs.js';
  const userPrefsFileContent = await readFile(userPrefsFilePath);
  const extensionUuids = getAllExtensionUuidsFromPrefs(userPrefsFileContent);

  return extensionUuids;
}

function getAllExtensionUuidsFromPrefs(userPrefsFileContent) {
  const extensionUuids = [];
  const usersPrefsList = userPrefsFileContent.split(';');

  for (const currentPref of usersPrefsList) {
    if (currentPref.includes('extensions.webextensions.uuids')) {
      const uuidList = currentPref.split(':')[1].replaceAll('"', '').replace('}', '')
        .replace(')', '').replace('\\', '');
      const uuids = uuidList.split(',');
      extensionUuids.push(...uuids);
    }
  }

  return extensionUuids;
}

function readFile(pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}



const soruSor = (soru) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    historySize: 0, // Geri alma işlemi için geçmişi devre dışı bırakır

  });

  return new Promise((resolve, reject) => {
    rl.question(soru, (cevap) => {
      rl.close();
      resolve(cevap);
    });
  });
};

function bosluklariSil(metin) {
  return metin.replace(/\s/g, '');
}


function kontrolVeOlustur(klasor) {
  if (!fs.existsSync(klasor)) {
    fs.mkdirSync(klasor);
  } else {

  }
}


var name = "";
var basla = "";
var bitir = "";
var sezon = "";
var vpn = false;
var vpn_yazi = "";



function init() {
  process.title = "Sezonlukdizi downloader 1.0";

  console.clear();

  log("Sezonlukdizi downloader 1.0 by AdemErsln", "success");
  console.log(" ")

  const args = process.argv.slice(2); // İlk iki argümanı atlayarak gerçek argümanları alır

  // "--dizi" argümanının değerini almak için kontrol edebilirsiniz
  const diziArgIndex = args.indexOf('--dizi');
  const dizi = diziArgIndex !== -1 ? args[diziArgIndex + 1] : null;

  if (args[0] == "help" || args[0] == undefined) {
    console.log(`Gerekli Argümanlar:
'Regular-show'        Dizinin Adı
1                     Sezon
2                     Başlangıç Bölüm
10                    Bitiş Bölümü
1                     Vpn(Sezonlukdizi türkiye dışında çalışmadığı için gerekli zaten türkiyede isen 0 yazarsın)`);
    console.log("Kullanım örneği:");
    console.log("'regular-show' 1 1 1 0");
    process.exit();
  }

  else {
    name = args[0];
    sezon = args[1];
    basla = args[2];
    bitir = args[3];
    vpn = args[4];

    if (vpn == 1) {
      vpn = true;
      vpn_yazi = "Evet";
    }
    else {
      vpn = false
      vpn_yazi = "Hayır";
    }
    console.log("-------------------------");
    console.log("Dizi İsmi: " + name);
    console.log("Sezon: " + sezon);
    console.log("Başlangıç bölümü: " + basla);
    console.log("Bitiş bölümü: " + bitir);
    console.log("VPN: " + vpn_yazi);
    console.log("-------------------------");

    if (vpn_yazi == "Hayır") {
      get_links(name, sezon, basla, bitir)
    }
    else {
      options.addExtensions("./vpn.xpi")
      getAllExtensionUuids()
        .then((extensionUuids) => {
          return extensionUuids;
        })
        .then((extensionUuids) => {
          const str = extensionUuids[0];
          const output = str.replace(/\\/g, '');
          connect_vpn(output);


        })
        .catch((err) => {
          console.error('Hata:', err);
        });

    }
  }

}

init();