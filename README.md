# Kurulum
* [Node.JS](https://nodejs.org/en/) Cihazınıda Node kurulu olduğuna emin olun.
* Yeşil Code butonuna basın ve Downland zip seçeneğine tıklayın indirme işlemini bekleyin.
* İndirme işlemi tamamlandığında zipin üstüne gelerek buraya çıkartı işaretleyin.
* Klasörü çıkardıkdan sonra  src klasöründe ki `config.js` adlı dosyayı doldurmanız gerekmekte doğru bir şekilde doldurduğunuzdan emin olun.
  * `Client_Token`: Botunuzun tokeni Discord developer portaldan alabilirsiniz.
  * `MongoDB_ConnectURL`: Mongo bağlantınız nasıl alınacağını bilmiyorsanız [anlatım](https://www.youtube.com/watch?v=s_-gJn9GDus)
  * `Prefix`: Botunuzun prefixi yani komutları çalıştırmak için ihtiyaç olan ön ek.
  * `Custom_Status_Text` Botunuzun özel durumunda yazan yazı. 
  * `Custom_Status_Type` Botunuzun özel durumunda ki eylem kısmı.
  * `Custom_Status` Botunuzun özel durumu yani botu çevrimiçi rahatsız etmeyin gibi gösteren ayar.

* Hepsini Doldurup kaydettikden sonra botun klasörüne geri gelin.
* install modules.bat adlı dosyayı çalıştırın ve modüllerin inmesini bekleyin indiği zaman kendi otomatik kapanacaktır.
* Modüller kuruldukdan sonra terminali kapatabilirsiniz tekrar botun klasörüne gelin ve  `start.bat` adlı dosyayı çalıştırın artık botunuz aktif güle güle kullanın. 🎉
* Botda bulduğunuz hataları bildirmeyi unutmayın.
* Yardım almak için `discord.gg/serendia` sunucusunu ziyaret edebilirsiniz


# Kullanım
* ilk önce kurulum yapmalısınız.
* `prefix+muterole @role/ID` Yazarak mute rolünü ayarlıyabilirsin.
* `prefix+logchannel @channel/ID` Yazarak cezaların loglanacağı kanalı ayarlıyabilirsin.
* `prefix+mutesüre 10(dakika cinsinden)` Yazarak ceza olarak mute alıcak kişilerin kaç dakika cezalı kalacağını ayarlıyabilirsin.
* `prefix+komutlar` Yazarak tüm komutlar ve kullanımlarını görebilirsin.
* Whitelist'e eklediğin kullanıcılar roller veya kanalların engellenmiyecek'lerini unutma.
* Sunucunun durumunu görmek için `prefix+serverstatus` yazabilirsin.
![Örnek](https://i.hizliresim.com/ha3wyl.png)
