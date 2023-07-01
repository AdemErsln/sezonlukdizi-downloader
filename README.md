# Sezonlukdizi Downloader

Sezonluk Dizi, kullanıcılara güncel ve popüler dizi içeriklerini tek bir yerden indirmeyi amaçlayan bir uygulamadır. Bu uygulama sayesinde teker teker içerikleri indirmekle uğraşmadan, istediğiniz dizi bölümlerini kolayca erişebilirsiniz.

## Gereksinimler

Bu projenin çalışması için aşağıdaki yazılımların yüklü olması gerekmektedir:

- Node.js (sürüm > 17)
- npm (sürüm latest)

## Kurulum

1. Proje dosyalarını bilgisayarınıza indirin veya klonlayın.
2. Konsolu açın ve projenin kök dizinine gidin.
3. `npm install` komutunu çalıştırarak projenin bağımlılıklarını yükleyin.

## Kullanım

Proje bağımlılıkları yüklendikten sonra aşağıdaki adımları izleyerek projeyi kullanabilirsiniz:

1. Aşağıdaki tabloda yer alan argümanları kullanarak komutu çalıştırın:

   | Argüman         | Açıklama                              |
   | --------------- | ------------------------------------- |
   | Dizinin Adı     | İndirilecek dizinin adı                |
   | Sezon           | İndirilecek sezon numarası             |
   | Başlangıç Bölümü | İndirilecek başlangıç bölüm numarası   |
   | Bitiş Bölümü    | İndirilecek bitiş bölüm numarası       |
   | Vpn             | VPN kullanımı (0: Türkiye, 1: Türkiye dışı) |

   Örneğin:
   ```bash
   node index.js "regular-show" 1 1 1 0

## Katkı

Katkıda bulunmak için aşağıdaki adımları izleyebilirsiniz:

1. Bu projeyi fork edin: [Fork](https://github.com/AdemErsln/sezonlukdizi-downloader/fork)
2. Yeni bir özellik dalı oluşturun: `git checkout -b ozellik/ozellik-adı`
3. Değişikliklerinizi yapın ve kaydedin: `git commit -am 'Yeni özellik: Ozellik Açıklaması'`
4. Dalınızı ana projeye gönderin: `git push origin ozellik/ozellik-adı`
5. Bir Pull Request (PR) oluşturun ve değişikliklerinizi açıklayın

Bu projeye katkıda bulunmak için Pull Request göndermekten çekinmeyin. Her türlü katkı ve öneriye açığız. Projeye eklemek istediğiniz özellikleri veya düzeltmeleri belirtmek için bir Issue açabilirsiniz.

Katkılarınızı değerlendirmek ve projeye dahil etmek için elimizden gelenin en iyisini yapacağız. Teşekkür ederiz!
