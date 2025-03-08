Gün Projesi: Validation ve Hata Mesajları
100%
Kullanıcıların hatalı girişleri yüzünden backend server'ına gereksiz çok sayıda istek geliyor. Bunlar da gereksiz maliyet oluşturuyor.

Bunu düzeltmek için;

[ ] form elemanlarına validasyon ekleyelim. (https://i.ibb.co/jgqcJj4/s7d3-task2.png)

Emailin gerçekten doğru bir email olmasını kontrol edelim.
password en az 4 karakter iken Sign in olabilsin.
terms kabul edilmeden sign in olamasın. (ipucu: handleSubmit)
[ ] Validasyon sonrası hata mesajlarını da reactstrap hata mesajları olarak gösterelim.

Hata yokken hata mesajı componentini ekranda render etmeyelim
[ ] Form valid olmadığı sürece Sign in butonu disabled olsun.

Bunun için isValid state'i tanımlayalım.

handleSubmit'de form valid ise post atabilsin.

form valid ise Sign In butonu enabled olsun.

İpucu: hata mesajları metinleri bir constant olarak tanımlanmış. errorMessages objesini kullanabilirsin.

İpucu: reactstrap input alanına eklenen invalid prop'una dikkat