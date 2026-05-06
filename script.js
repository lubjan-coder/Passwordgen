const cfg = { upper: true, lower: true, numbers: true, symbols: true, noambig: false, memorable: false };
const C = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', numbers: '0123456789', symbols: '!@#$%^&*-_=+?' };
const VOWELS = 'aeiou', CONS = 'bcdfghjklmnprstvwx';
let qty = 1, lastPw = '';

const LANGS = {
  fr:{heroSub:'Générez des mots de passe sécurisés en un instant',result:'Résultat',settings:'Paramètres',length:'Longueur',include:'Inclure',upper:'Majuscules A–Z',lower:'Minuscules a–z',numbers:'Chiffres 0–9',symbols:'Symboles ! @ # $',noambig:'Exclure 0/O/l/1',memorable:'Mémorable',qty:'Quantité',generate:'Générer',copy:'Copier',copied:'Copié',all:'Tous les résultats',weak:'Faible',medium:'Moyen',good:'Bon',strong:'Solide',footer:'Outil gratuit de génération de mots de passe sécurisés'},
  en:{heroSub:'Generate secure passwords instantly',result:'Result',settings:'Settings',length:'Length',include:'Include',upper:'Uppercase A–Z',lower:'Lowercase a–z',numbers:'Numbers 0–9',symbols:'Symbols ! @ # $',noambig:'Exclude 0/O/l/1',memorable:'Memorable',qty:'Quantity',generate:'Generate',copy:'Copy',copied:'Copied',all:'All results',weak:'Weak',medium:'Medium',good:'Good',strong:'Strong',footer:'Free secure password generator tool'},
  es:{heroSub:'Genera contraseñas seguras al instante',result:'Resultado',settings:'Configuración',length:'Longitud',include:'Incluir',upper:'Mayúsculas A–Z',lower:'Minúsculas a–z',numbers:'Números 0–9',symbols:'Símbolos ! @ # $',noambig:'Excluir 0/O/l/1',memorable:'Memorable',qty:'Cantidad',generate:'Generar',copy:'Copiar',copied:'Copiado',all:'Todos los resultados',weak:'Débil',medium:'Media',good:'Buena',strong:'Fuerte',footer:'Generador de contraseñas seguras gratuito'},
  de:{heroSub:'Sichere Passwörter sofort generieren',result:'Ergebnis',settings:'Einstellungen',length:'Länge',include:'Einschließen',upper:'Großbuchstaben A–Z',lower:'Kleinbuchstaben a–z',numbers:'Zahlen 0–9',symbols:'Symbole ! @ # $',noambig:'0/O/l/1 ausschließen',memorable:'Einprägsam',qty:'Anzahl',generate:'Generieren',copy:'Kopieren',copied:'Kopiert',all:'Alle Ergebnisse',weak:'Schwach',medium:'Mittel',good:'Gut',strong:'Stark',footer:'Kostenloses sicheres Passwortgenerator-Tool'},
  it:{heroSub:'Genera password sicure in un istante',result:'Risultato',settings:'Impostazioni',length:'Lunghezza',include:'Includi',upper:'Maiuscole A–Z',lower:'Minuscole a–z',numbers:'Numeri 0–9',symbols:'Simboli ! @ # $',noambig:'Escludi 0/O/l/1',memorable:'Memorabile',qty:'Quantità',generate:'Genera',copy:'Copia',copied:'Copiato',all:'Tutti i risultati',weak:'Debole',medium:'Media',good:'Buona',strong:'Forte',footer:'Strumento gratuito per generare password sicure'},
  pt:{heroSub:'Gere senhas seguras instantaneamente',result:'Resultado',settings:'Configurações',length:'Comprimento',include:'Incluir',upper:'Maiúsculas A–Z',lower:'Minúsculas a–z',numbers:'Números 0–9',symbols:'Símbolos ! @ # $',noambig:'Excluir 0/O/l/1',memorable:'Memorável',qty:'Quantidade',generate:'Gerar',copy:'Copiar',copied:'Copiado',all:'Todos os resultados',weak:'Fraca',medium:'Média',good:'Boa',strong:'Forte',footer:'Ferramenta gratuita de geração de senhas seguras'},
  nl:{heroSub:'Genereer direct veilige wachtwoorden',result:'Resultaat',settings:'Instellingen',length:'Lengte',include:'Opnemen',upper:'Hoofdletters A–Z',lower:'Kleine letters a–z',numbers:'Cijfers 0–9',symbols:'Symbolen ! @ # $',noambig:'Sluit 0/O/l/1 uit',memorable:'Gedenkwaardig',qty:'Hoeveelheid',generate:'Genereren',copy:'Kopiëren',copied:'Gekopieerd',all:'Alle resultaten',weak:'Zwak',medium:'Gemiddeld',good:'Goed',strong:'Sterk',footer:'Gratis tool voor het genereren van veilige wachtwoorden'},
  pl:{heroSub:'Generuj bezpieczne hasła natychmiast',result:'Wynik',settings:'Ustawienia',length:'Długość',include:'Uwzględnij',upper:'Wielkie litery A–Z',lower:'Małe litery a–z',numbers:'Cyfry 0–9',symbols:'Symbole ! @ # $',noambig:'Wyklucz 0/O/l/1',memorable:'Łatwe do zapamiętania',qty:'Ilość',generate:'Generuj',copy:'Kopiuj',copied:'Skopiowano',all:'Wszystkie wyniki',weak:'Słabe',medium:'Średnie',good:'Dobre',strong:'Silne',footer:'Darmowe narzędzie do generowania bezpiecznych haseł'},
  ru:{heroSub:'Генерируйте надёжные пароли мгновенно',result:'Результат',settings:'Настройки',length:'Длина',include:'Включить',upper:'Заглавные A–Z',lower:'Строчные a–z',numbers:'Цифры 0–9',symbols:'Символы ! @ # $',noambig:'Исключить 0/O/l/1',memorable:'Запоминаемый',qty:'Количество',generate:'Сгенерировать',copy:'Копировать',copied:'Скопировано',all:'Все результаты',weak:'Слабый',medium:'Средний',good:'Хороший',strong:'Надёжный',footer:'Бесплатный генератор надёжных паролей'},
  zh:{heroSub:'即时生成安全密码',result:'结果',settings:'设置',length:'长度',include:'包含',upper:'大写字母 A–Z',lower:'小写字母 a–z',numbers:'数字 0–9',symbols:'符号 ! @ # $',noambig:'排除 0/O/l/1',memorable:'易记',qty:'数量',generate:'生成',copy:'复制',copied:'已复制',all:'所有结果',weak:'弱',medium:'中',good:'良',strong:'强',footer:'免费安全密码生成工具'},
  ja:{heroSub:'安全なパスワードを即時生成',result:'結果',settings:'設定',length:'長さ',include:'含める',upper:'大文字 A–Z',lower:'小文字 a–z',numbers:'数字 0–9',symbols:'記号 ! @ # $',noambig:'0/O/l/1 を除外',memorable:'覚えやすい',qty:'数量',generate:'生成',copy:'コピー',copied:'コピーしました',all:'すべての結果',weak:'弱い',medium:'普通',good:'良い',strong:'強い',footer:'無料の安全なパスワード生成ツール'},
  ko:{heroSub:'안전한 비밀번호를 즉시 생성하세요',result:'결과',settings:'설정',length:'길이',include:'포함',upper:'대문자 A–Z',lower:'소문자 a–z',numbers:'숫자 0–9',symbols:'기호 ! @ # $',noambig:'0/O/l/1 제외',memorable:'기억하기 쉬운',qty:'수량',generate:'생성',copy:'복사',copied:'복사됨',all:'모든 결과',weak:'약함',medium:'보통',good:'양호',strong:'강함',footer:'무료 안전 비밀번호 생성 도구'},
  ar:{heroSub:'أنشئ كلمات مرور آمنة فوراً',result:'النتيجة',settings:'الإعدادات',length:'الطول',include:'تضمين',upper:'أحرف كبيرة A–Z',lower:'أحرف صغيرة a–z',numbers:'أرقام 0–9',symbols:'رموز ! @ # $',noambig:'استبعاد 0/O/l/1',memorable:'سهل التذكر',qty:'الكمية',generate:'إنشاء',copy:'نسخ',copied:'تم النسخ',all:'جميع النتائج',weak:'ضعيف',medium:'متوسط',good:'جيد',strong:'قوي',footer:'أداة مجانية لإنشاء كلمات مرور آمنة'},
  tr:{heroSub:'Anında güvenli şifreler oluşturun',result:'Sonuç',settings:'Ayarlar',length:'Uzunluk',include:'Dahil et',upper:'Büyük harfler A–Z',lower:'Küçük harfler a–z',numbers:'Rakamlar 0–9',symbols:'Semboller ! @ # $',noambig:'0/O/l/1 hariç tut',memorable:'Akılda kalıcı',qty:'Miktar',generate:'Oluştur',copy:'Kopyala',copied:'Kopyalandı',all:'Tüm sonuçlar',weak:'Zayıf',medium:'Orta',good:'İyi',strong:'Güçlü',footer:'Ücretsiz güvenli şifre oluşturma aracı'},
  sv:{heroSub:'Generera säkra lösenord direkt',result:'Resultat',settings:'Inställningar',length:'Längd',include:'Inkludera',upper:'Versaler A–Z',lower:'Gemener a–z',numbers:'Siffror 0–9',symbols:'Symboler ! @ # $',noambig:'Exkludera 0/O/l/1',memorable:'Minnesvärd',qty:'Antal',generate:'Generera',copy:'Kopiera',copied:'Kopierat',all:'Alla resultat',weak:'Svagt',medium:'Medel',good:'Bra',strong:'Starkt',footer:'Gratis verktyg för säkra lösenord'},
  da:{heroSub:'Generer sikre adgangskoder øjeblikkeligt',result:'Resultat',settings:'Indstillinger',length:'Længde',include:'Inkluder',upper:'Store bogstaver A–Z',lower:'Små bogstaver a–z',numbers:'Tal 0–9',symbols:'Symboler ! @ # $',noambig:'Ekskluder 0/O/l/1',memorable:'Mindeværdig',qty:'Antal',generate:'Generer',copy:'Kopiér',copied:'Kopieret',all:'Alle resultater',weak:'Svag',medium:'Middel',good:'God',strong:'Stærk',footer:'Gratis sikker adgangskodegenerator'},
  fi:{heroSub:'Luo turvallisia salasanoja välittömästi',result:'Tulos',settings:'Asetukset',length:'Pituus',include:'Sisällytä',upper:'Isot kirjaimet A–Z',lower:'Pienet kirjaimet a–z',numbers:'Numerot 0–9',symbols:'Symbolit ! @ # $',noambig:'Poissulje 0/O/l/1',memorable:'Muistettava',qty:'Määrä',generate:'Luo',copy:'Kopioi',copied:'Kopioitu',all:'Kaikki tulokset',weak:'Heikko',medium:'Kohtalainen',good:'Hyvä',strong:'Vahva',footer:'Ilmainen turvallinen salasanageneraattori'},
  no:{heroSub:'Generer sikre passord umiddelbart',result:'Resultat',settings:'Innstillinger',length:'Lengde',include:'Inkluder',upper:'Store bokstaver A–Z',lower:'Små bokstaver a–z',numbers:'Tall 0–9',symbols:'Symboler ! @ # $',noambig:'Ekskluder 0/O/l/1',memorable:'Minneverdig',qty:'Antall',generate:'Generer',copy:'Kopier',copied:'Kopiert',all:'Alle resultater',weak:'Svak',medium:'Middels',good:'God',strong:'Sterk',footer:'Gratis sikker passordgenerator'},
  cs:{heroSub:'Okamžitě generujte bezpečná hesla',result:'Výsledek',settings:'Nastavení',length:'Délka',include:'Zahrnout',upper:'Velká písmena A–Z',lower:'Malá písmena a–z',numbers:'Číslice 0–9',symbols:'Symboly ! @ # $',noambig:'Vyloučit 0/O/l/1',memorable:'Zapamatovatelné',qty:'Množství',generate:'Generovat',copy:'Kopírovat',copied:'Zkopírováno',all:'Všechny výsledky',weak:'Slabé',medium:'Střední',good:'Dobré',strong:'Silné',footer:'Bezplatný generátor bezpečných hesel'},
  sk:{heroSub:'Okamžite generujte bezpečné heslá',result:'Výsledok',settings:'Nastavenia',length:'Dĺžka',include:'Zahrnúť',upper:'Veľké písmená A–Z',lower:'Malé písmená a–z',numbers:'Číslice 0–9',symbols:'Symboly ! @ # $',noambig:'Vylúčiť 0/O/l/1',memorable:'Zapamätateľné',qty:'Množstvo',generate:'Generovať',copy:'Kopírovať',copied:'Skopírované',all:'Všetky výsledky',weak:'Slabé',medium:'Stredné',good:'Dobré',strong:'Silné',footer:'Bezplatný generátor bezpečných hesiel'},
  hu:{heroSub:'Azonnal generáljon biztonságos jelszavakat',result:'Eredmény',settings:'Beállítások',length:'Hossz',include:'Tartalmaz',upper:'Nagybetűk A–Z',lower:'Kisbetűk a–z',numbers:'Számok 0–9',symbols:'Szimbólumok ! @ # $',noambig:'0/O/l/1 kizárása',memorable:'Megjegyezhető',qty:'Mennyiség',generate:'Generálás',copy:'Másolás',copied:'Másolva',all:'Összes eredmény',weak:'Gyenge',medium:'Közepes',good:'Jó',strong:'Erős',footer:'Ingyenes biztonságos jelszógenerátor'},
  ro:{heroSub:'Generați parole sigure instant',result:'Rezultat',settings:'Setări',length:'Lungime',include:'Includeți',upper:'Majuscule A–Z',lower:'Minuscule a–z',numbers:'Cifre 0–9',symbols:'Simboluri ! @ # $',noambig:'Excludeți 0/O/l/1',memorable:'Memorabil',qty:'Cantitate',generate:'Generați',copy:'Copiați',copied:'Copiat',all:'Toate rezultatele',weak:'Slab',medium:'Mediu',good:'Bun',strong:'Puternic',footer:'Instrument gratuit de generare a parolelor sigure'},
  bg:{heroSub:'Генерирайте сигурни пароли моментално',result:'Резултат',settings:'Настройки',length:'Дължина',include:'Включете',upper:'Главни букви A–Z',lower:'Малки букви a–z',numbers:'Цифри 0–9',symbols:'Символи ! @ # $',noambig:'Изключете 0/O/l/1',memorable:'Запомнящ се',qty:'Количество',generate:'Генериране',copy:'Копиране',copied:'Копирано',all:'Всички резултати',weak:'Слаба',medium:'Средна',good:'Добра',strong:'Силна',footer:'Безплатен генератор на сигурни пароли'},
  hr:{heroSub:'Trenutno generirajte sigurne lozinke',result:'Rezultat',settings:'Postavke',length:'Duljina',include:'Uključi',upper:'Velika slova A–Z',lower:'Mala slova a–z',numbers:'Brojevi 0–9',symbols:'Simboli ! @ # $',noambig:'Isključi 0/O/l/1',memorable:'Pamtljivo',qty:'Količina',generate:'Generiraj',copy:'Kopiraj',copied:'Kopirano',all:'Svi rezultati',weak:'Slaba',medium:'Srednja',good:'Dobra',strong:'Jaka',footer:'Besplatni alat za generiranje sigurnih lozinki'},
  sr:{heroSub:'Тренутно генеришите сигурне лозинке',result:'Резултат',settings:'Подешавања',length:'Дужина',include:'Укључи',upper:'Велика слова A–Z',lower:'Мала слова a–z',numbers:'Бројеви 0–9',symbols:'Симболи ! @ # $',noambig:'Искључи 0/O/l/1',memorable:'Памтљива',qty:'Количина',generate:'Генериши',copy:'Копирај',copied:'Копирано',all:'Сви резултати',weak:'Слаба',medium:'Средња',good:'Добра',strong:'Јака',footer:'Бесплатан алат за генерисање сигурних лозинки'},
  uk:{heroSub:'Миттєво генеруйте надійні паролі',result:'Результат',settings:'Налаштування',length:'Довжина',include:'Включити',upper:'Великі літери A–Z',lower:'Малі літери a–z',numbers:'Цифри 0–9',symbols:'Символи ! @ # $',noambig:'Виключити 0/O/l/1',memorable:'Запам\'ятовуваний',qty:'Кількість',generate:'Генерувати',copy:'Копіювати',copied:'Скопійовано',all:'Всі результати',weak:'Слабкий',medium:'Середній',good:'Хороший',strong:'Надійний',footer:'Безкоштовний генератор надійних паролів'},
  el:{heroSub:'Δημιουργήστε ασφαλείς κωδικούς αμέσως',result:'Αποτέλεσμα',settings:'Ρυθμίσεις',length:'Μήκος',include:'Συμπεριλάβετε',upper:'Κεφαλαία A–Z',lower:'Πεζά a–z',numbers:'Αριθμοί 0–9',symbols:'Σύμβολα ! @ # $',noambig:'Εξαίρεση 0/O/l/1',memorable:'Αξιομνημόνευτο',qty:'Ποσότητα',generate:'Δημιουργία',copy:'Αντιγραφή',copied:'Αντιγράφηκε',all:'Όλα τα αποτελέσματα',weak:'Αδύναμος',medium:'Μέτριος',good:'Καλός',strong:'Ισχυρός',footer:'Δωρεάν εργαλείο δημιουργίας ασφαλών κωδικών'},
  he:{heroSub:'צור סיסמאות מאובטחות מיידית',result:'תוצאה',settings:'הגדרות',length:'אורך',include:'כלול',upper:'אותיות גדולות A–Z',lower:'אותיות קטנות a–z',numbers:'ספרות 0–9',symbols:'סמלים ! @ # $',noambig:'הוצא 0/O/l/1',memorable:'קל לזכירה',qty:'כמות',generate:'צור',copy:'העתק',copied:'הועתק',all:'כל התוצאות',weak:'חלש',medium:'בינוני',good:'טוב',strong:'חזק',footer:'כלי חינמי ליצירת סיסמאות מאובטחות'},
  hi:{heroSub:'तुरंत सुरक्षित पासवर्ड बनाएं',result:'परिणाम',settings:'सेटिंग्स',length:'लंबाई',include:'शामिल करें',upper:'बड़े अक्षर A–Z',lower:'छोटे अक्षर a–z',numbers:'अंक 0–9',symbols:'प्रतीक ! @ # $',noambig:'0/O/l/1 हटाएं',memorable:'यादगार',qty:'मात्रा',generate:'बनाएं',copy:'कॉपी करें',copied:'कॉपी हो गया',all:'सभी परिणाम',weak:'कमजोर',medium:'मध्यम',good:'अच्छा',strong:'मजबूत',footer:'मुफ्त सुरक्षित पासवर्ड जनरेटर'},
  bn:{heroSub:'তাৎক্ষণিকভাবে নিরাপদ পাসওয়ার্ড তৈরি করুন',result:'ফলাফল',settings:'সেটিংস',length:'দৈর্ঘ্য',include:'অন্তর্ভুক্ত করুন',upper:'বড় হাতের A–Z',lower:'ছোট হাতের a–z',numbers:'সংখ্যা 0–9',symbols:'চিহ্ন ! @ # $',noambig:'0/O/l/1 বাদ দিন',memorable:'স্মরণীয়',qty:'পরিমাণ',generate:'তৈরি করুন',copy:'কপি করুন',copied:'কপি হয়েছে',all:'সমস্ত ফলাফল',weak:'দুর্বল',medium:'মাঝারি',good:'ভালো',strong:'শক্তিশালী',footer:'বিনামূল্যে নিরাপদ পাসওয়ার্ড জেনারেটর'},
  ur:{heroSub:'فوری طور پر محفوظ پاس ورڈ بنائیں',result:'نتیجہ',settings:'ترتیبات',length:'لمبائی',include:'شامل کریں',upper:'بڑے حروف A–Z',lower:'چھوٹے حروف a–z',numbers:'اعداد 0–9',symbols:'علامات ! @ # $',noambig:'0/O/l/1 نکالیں',memorable:'یادگار',qty:'مقدار',generate:'بنائیں',copy:'کاپی کریں',copied:'کاپی ہو گیا',all:'تمام نتائج',weak:'کمزور',medium:'اوسط',good:'اچھا',strong:'مضبوط',footer:'مفت محفوظ پاس ورڈ جنریٹر'},
  fa:{heroSub:'فوری رمز عبور امن بسازید',result:'نتیجه',settings:'تنظیمات',length:'طول',include:'شامل کردن',upper:'حروف بزرگ A–Z',lower:'حروف کوچک a–z',numbers:'اعداد 0–9',symbols:'نمادها ! @ # $',noambig:'حذف 0/O/l/1',memorable:'به‌یادماندنی',qty:'تعداد',generate:'تولید',copy:'کپی',copied:'کپی شد',all:'همه نتایج',weak:'ضعیف',medium:'متوسط',good:'خوب',strong:'قوی',footer:'ابزار رایگان تولید رمز عبور امن'},
  th:{heroSub:'สร้างรหัสผ่านที่ปลอดภัยทันที',result:'ผลลัพธ์',settings:'การตั้งค่า',length:'ความยาว',include:'รวม',upper:'ตัวพิมพ์ใหญ่ A–Z',lower:'ตัวพิมพ์เล็ก a–z',numbers:'ตัวเลข 0–9',symbols:'สัญลักษณ์ ! @ # $',noambig:'ไม่รวม 0/O/l/1',memorable:'จำง่าย',qty:'จำนวน',generate:'สร้าง',copy:'คัดลอก',copied:'คัดลอกแล้ว',all:'ผลลัพธ์ทั้งหมด',weak:'อ่อนแอ',medium:'ปานกลาง',good:'ดี',strong:'แข็งแกร่ง',footer:'เครื่องมือสร้างรหัสผ่านที่ปลอดภัยฟรี'},
  vi:{heroSub:'Tạo mật khẩu bảo mật ngay lập tức',result:'Kết quả',settings:'Cài đặt',length:'Độ dài',include:'Bao gồm',upper:'Chữ hoa A–Z',lower:'Chữ thường a–z',numbers:'Số 0–9',symbols:'Ký hiệu ! @ # $',noambig:'Loại trừ 0/O/l/1',memorable:'Dễ nhớ',qty:'Số lượng',generate:'Tạo',copy:'Sao chép',copied:'Đã sao chép',all:'Tất cả kết quả',weak:'Yếu',medium:'Trung bình',good:'Tốt',strong:'Mạnh',footer:'Công cụ tạo mật khẩu bảo mật miễn phí'},
  id:{heroSub:'Buat kata sandi aman secara instan',result:'Hasil',settings:'Pengaturan',length:'Panjang',include:'Sertakan',upper:'Huruf besar A–Z',lower:'Huruf kecil a–z',numbers:'Angka 0–9',symbols:'Simbol ! @ # $',noambig:'Kecualikan 0/O/l/1',memorable:'Mudah diingat',qty:'Jumlah',generate:'Buat',copy:'Salin',copied:'Disalin',all:'Semua hasil',weak:'Lemah',medium:'Sedang',good:'Baik',strong:'Kuat',footer:'Alat pembuat kata sandi aman gratis'},
  ms:{heroSub:'Jana kata laluan selamat serta-merta',result:'Keputusan',settings:'Tetapan',length:'Panjang',include:'Sertakan',upper:'Huruf besar A–Z',lower:'Huruf kecil a–z',numbers:'Nombor 0–9',symbols:'Simbol ! @ # $',noambig:'Kecualikan 0/O/l/1',memorable:'Mudah diingat',qty:'Kuantiti',generate:'Jana',copy:'Salin',copied:'Disalin',all:'Semua keputusan',weak:'Lemah',medium:'Sederhana',good:'Baik',strong:'Kuat',footer:'Alat percuma jana kata laluan selamat'},
  tl:{heroSub:'Lumikha ng mga ligtas na password kaagad',result:'Resulta',settings:'Mga Setting',length:'Haba',include:'Isama',upper:'Malalaking titik A–Z',lower:'Maliliit na titik a–z',numbers:'Mga numero 0–9',symbols:'Mga simbolo ! @ # $',noambig:'Ibukod ang 0/O/l/1',memorable:'Madaling matandaan',qty:'Dami',generate:'Lumikha',copy:'Kopyahin',copied:'Nakopya',all:'Lahat ng resulta',weak:'Mahina',medium:'Katamtaman',good:'Mabuti',strong:'Malakas',footer:'Libreng tool sa paglikha ng ligtas na password'},
  sw:{heroSub:'Tengeneza nywila salama mara moja',result:'Matokeo',settings:'Mipangilio',length:'Urefu',include:'Jumuisha',upper:'Herufi kubwa A–Z',lower:'Herufi ndogo a–z',numbers:'Nambari 0–9',symbols:'Alama ! @ # $',noambig:'Ondoa 0/O/l/1',memorable:'Inayokumbukwa',qty:'Kiasi',generate:'Tengeneza',copy:'Nakili',copied:'Imenakiliwa',all:'Matokeo yote',weak:'Dhaifu',medium:'Wastani',good:'Nzuri',strong:'Imara',footer:'Zana ya bure ya kutengeneza nywila salama'},
  am:{heroSub:'ወዲያውኑ ደህንነቱ የተጠበቀ የይለፍ ቃል ይፍጠሩ',result:'ውጤት',settings:'ቅንብሮች',length:'ርዝሜና',include:'አካትት',upper:'ካፒታል ፊደሎች A–Z',lower:'ትንሽ ፊደሎች a–z',numbers:'ቁጥሮች 0–9',symbols:'ምልክቶች ! @ # $',noambig:'0/O/l/1 አስወግድ',memorable:'ማስታወስ የሚቻል',qty:'ብዛት',generate:'ፍጠር',copy:'ቅዳ',copied:'ተቀድቷል',all:'ሁሉም ውጤቶች',weak:'ደካማ',medium:'መካከለኛ',good:'ጥሩ',strong:'ጠንካራ',footer:'ነፃ ደህንነቱ የተጠበቀ የይለፍ ቃል ፈጣሪ'},
  yo:{heroSub:'Ṣẹda awọn ọrọ igbaniwọle aabo lẹsẹkẹsẹ',result:'Abajade',settings:'Eto',length:'Gigun',include:'Fi sii',upper:'Awọn lẹta nla A–Z',lower:'Awọn lẹta kekere a–z',numbers:'Awọn nọmba 0–9',symbols:'Awọn ami ! @ # $',noambig:'Yọ 0/O/l/1 kuro',memorable:'Rọrun lati ranti',qty:'Iye',generate:'Ṣẹda',copy:'Daakọ',copied:'Ti daakọ',all:'Gbogbo awọn abajade',weak:'Alailagbara',medium:'Aarin',good:'Dara',strong:'Lagbara',footer:'Ohun elo ọfẹ fun ṣiṣẹda awọn ọrọ igbaniwọle aabo'},
  ha:{heroSub:'Ƙirƙiri kalmomin shiga lafiya nan da nan',result:'Sakamakon',settings:'Saiti',length:'Tsawo',include:'Haɗa',upper:'Manyan haruffa A–Z',lower:'Ƙananan haruffa a–z',numbers:'Lambobi 0–9',symbols:'Alamu ! @ # $',noambig:'Cire 0/O/l/1',memorable:'Mai sauƙin tunawa',qty:'Yawa',generate:'Ƙirƙira',copy:'Kwafi',copied:'An kwafi',all:'Dukkan sakamakon',weak:'Rauni',medium:'Matsakaici',good:'Kyau',strong:'Ƙarfi',footer:'Kayan aiki kyauta na ƙirƙirar kalmomin shiga lafiya'},
  af:{heroSub:'Skep onmiddellik veilige wagwoorde',result:'Resultaat',settings:'Instellings',length:'Lengte',include:'Sluit in',upper:'Hoofletters A–Z',lower:'Kleinletters a–z',numbers:'Syfers 0–9',symbols:'Simbole ! @ # $',noambig:'Sluit 0/O/l/1 uit',memorable:'Gedenkwaardig',qty:'Hoeveelheid',generate:'Genereer',copy:'Kopieer',copied:'Gekopieer',all:'Alle resultate',weak:'Swak',medium:'Matig',good:'Goed',strong:'Sterk',footer:'Gratis veilige wagwoordgeneratortool'},
  ca:{heroSub:'Genereu contrasenyes segures al moment',result:'Resultat',settings:'Configuració',length:'Longitud',include:'Inclou',upper:'Majúscules A–Z',lower:'Minúscules a–z',numbers:'Xifres 0–9',symbols:'Símbols ! @ # $',noambig:'Exclou 0/O/l/1',memorable:'Memorable',qty:'Quantitat',generate:'Genera',copy:'Copia',copied:'Copiat',all:'Tots els resultats',weak:'Feble',medium:'Mitjana',good:'Bona',strong:'Forta',footer:'Eina gratuïta per generar contrasenyes segures'},
  eu:{heroSub:'Sortu pasahitz seguruak berehala',result:'Emaitza',settings:'Ezarpenak',length:'Luzera',include:'Sartu',upper:'Letra larriak A–Z',lower:'Letra xeheak a–z',numbers:'Zenbakiak 0–9',symbols:'Ikurrak ! @ # $',noambig:'Baztertu 0/O/l/1',memorable:'Gogoratzeko erraza',qty:'Kopurua',generate:'Sortu',copy:'Kopiatu',copied:'Kopiatuta',all:'Emaitza guztiak',weak:'Ahula',medium:'Ertaina',good:'Ona',strong:'Sendoa',footer:'Pasahitz seguruak sortzeko doako tresna'},
  gl:{heroSub:'Xera contrasinais seguros ao instante',result:'Resultado',settings:'Configuración',length:'Lonxitude',include:'Incluír',upper:'Maiúsculas A–Z',lower:'Minúsculas a–z',numbers:'Números 0–9',symbols:'Símbolos ! @ # $',noambig:'Excluír 0/O/l/1',memorable:'Memorable',qty:'Cantidade',generate:'Xerar',copy:'Copiar',copied:'Copiado',all:'Todos os resultados',weak:'Feble',medium:'Media',good:'Boa',strong:'Forte',footer:'Ferramenta gratuíta para xerar contrasinais seguros'},
  lt:{heroSub:'Akimirksniu generuokite saugius slaptažodžius',result:'Rezultatas',settings:'Nustatymai',length:'Ilgis',include:'Įtraukti',upper:'Didžiosios raidės A–Z',lower:'Mažosios raidės a–z',numbers:'Skaitmenys 0–9',symbols:'Simboliai ! @ # $',noambig:'Neįtraukti 0/O/l/1',memorable:'Lengvai įsimenamas',qty:'Kiekis',generate:'Generuoti',copy:'Kopijuoti',copied:'Nukopijuota',all:'Visi rezultatai',weak:'Silpnas',medium:'Vidutinis',good:'Geras',strong:'Stiprus',footer:'Nemokamas saugių slaptažodžių generatorius'},
  lv:{heroSub:'Nekavējoties ģenerējiet drošas paroles',result:'Rezultāts',settings:'Iestatījumi',length:'Garums',include:'Iekļaut',upper:'Lielie burti A–Z',lower:'Mazie burti a–z',numbers:'Cipari 0–9',symbols:'Simboli ! @ # $',noambig:'Izslēgt 0/O/l/1',memorable:'Viegli iegaumējams',qty:'Daudzums',generate:'Ģenerēt',copy:'Kopēt',copied:'Nokopēts',all:'Visi rezultāti',weak:'Vājš',medium:'Vidējs',good:'Labs',strong:'Stiprs',footer:'Bezmaksas drošu paroļu ģenerators'},
  et:{heroSub:'Looge koheselt turvalisi paroole',result:'Tulemus',settings:'Seaded',length:'Pikkus',include:'Kaasa arvata',upper:'Suurtähed A–Z',lower:'Väiketähed a–z',numbers:'Numbrid 0–9',symbols:'Sümbolid ! @ # $',noambig:'Välista 0/O/l/1',memorable:'Meeldejääv',qty:'Kogus',generate:'Genereeri',copy:'Kopeeri',copied:'Kopeeritud',all:'Kõik tulemused',weak:'Nõrk',medium:'Keskmine',good:'Hea',strong:'Tugev',footer:'Tasuta turvaliste paroolide generaator'},
  sl:{heroSub:'Ustvarite varna gesla takoj',result:'Rezultat',settings:'Nastavitve',length:'Dolžina',include:'Vključi',upper:'Velike črke A–Z',lower:'Male črke a–z',numbers:'Številke 0–9',symbols:'Simboli ! @ # $',noambig:'Izključi 0/O/l/1',memorable:'Zapomnljivo',qty:'Količina',generate:'Ustvari',copy:'Kopiraj',copied:'Kopirano',all:'Vsi rezultati',weak:'Šibko',medium:'Srednje',good:'Dobro',strong:'Močno',footer:'Brezplačno orodje za ustvarjanje varnih gesel'}
};

let currentLang = 'fr';

function t(key) { return (LANGS[currentLang] || LANGS.fr)[key] || LANGS.fr[key] || key; }

function applyLang() {
  document.getElementById('hero-sub').textContent = t('heroSub');
  document.getElementById('lbl-result').textContent = t('result');
  document.getElementById('lbl-settings').textContent = t('settings');
  document.getElementById('lbl-length').textContent = t('length');
  document.getElementById('lbl-include').textContent = t('include');
  document.getElementById('lbl-upper').textContent = t('upper');
  document.getElementById('lbl-lower').textContent = t('lower');
  document.getElementById('lbl-numbers').textContent = t('numbers');
  document.getElementById('lbl-symbols').textContent = t('symbols');
  document.getElementById('lbl-noambig').textContent = t('noambig');
  document.getElementById('lbl-memorable').textContent = t('memorable');
  document.getElementById('lbl-qty').textContent = t('qty');
  document.getElementById('gen-btn-el').textContent = t('generate');
  document.getElementById('copy-btn').textContent = t('copy');
  document.getElementById('lbl-all').textContent = t('all');
  document.getElementById('footer-txt').textContent = t('footer');
  document.getElementById('toast-txt').textContent = t('copied');
  if (lastPw) updateForce(lastPw);
}

function setLang(l) { currentLang = l; applyLang(); }

function charset() {
  let s = '';
  if (cfg.upper) s += C.upper;
  if (cfg.lower) s += C.lower;
  if (cfg.numbers) s += C.numbers;
  if (cfg.symbols) s += C.symbols;
  if (cfg.noambig) s = s.replace(/[0O1lI]/g, '');
  return s || C.lower;
}

function rnd(s) { return s[Math.floor(Math.random() * s.length)]; }

function makePw(len) {
  if (cfg.memorable) {
    let pw = '';
    for (let i = 0; i < len; i++) pw += i % 2 === 0 ? rnd(CONS) : rnd(VOWELS);
    if (cfg.numbers) pw = pw.slice(0, -2) + String(Math.floor(Math.random() * 99)).padStart(2, '0');
    return pw.slice(0, len);
  }
  let cs = charset(), pw = '';
  if (cfg.upper) pw += rnd(C.upper);
  if (cfg.lower) pw += rnd(C.lower);
  if (cfg.numbers) pw += rnd(C.numbers);
  if (cfg.symbols) pw += rnd(C.symbols);
  while (pw.length < len) pw += rnd(cs);
  return pw.split('').sort(() => Math.random() - .5).slice(0, len).join('');
}

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s += 20; if (pw.length >= 12) s += 15; if (pw.length >= 20) s += 15;
  if (/[A-Z]/.test(pw)) s += 15; if (/[a-z]/.test(pw)) s += 10;
  if (/[0-9]/.test(pw)) s += 12; if (/[^A-Za-z0-9]/.test(pw)) s += 18;
  if (pw.length >= 32) s += 5;
  return Math.min(100, s);
}

function updateForce(pw) {
  let s = strength(pw);
  let fill = document.getElementById('force-fill');
  let label = document.getElementById('force-label');
  fill.style.width = s + '%';
  let col, txt;
  if (s < 30) { col = '#d93025'; txt = t('weak'); }
  else if (s < 55) { col = '#f5a623'; txt = t('medium'); }
  else if (s < 80) { col = '#0050d3'; txt = t('good'); }
  else { col = '#00a651'; txt = t('strong'); }
  fill.style.background = col; label.style.color = col; label.textContent = txt;
}

function generate() {
  let len = parseInt(document.getElementById('len').value);
  let el = document.getElementById('pw-text');
  el.style.opacity = '0.3';
  setTimeout(() => {
    let pws = Array.from({ length: qty }, () => makePw(len));
    lastPw = pws[0];
    el.textContent = lastPw;
    el.classList.remove('blank');
    el.style.opacity = '1';
    updateForce(lastPw);
    let mw = document.getElementById('multi-wrap');
    if (qty > 1) {
      mw.classList.add('on');
      let mi = document.getElementById('multi-items');
      mi.innerHTML = '';
      pws.forEach((pw, i) => {
        let d = document.createElement('div');
        d.className = 'multi-item';
        d.style.animationDelay = (i * 0.04) + 's';
        d.innerHTML = `<span class="multi-pw">${pw}</span><button class="mini-copy" onclick="cpText('${pw.replace(/'/g, "\\'")}')">${t('copy')}</button>`;
        mi.appendChild(d);
      });
    } else mw.classList.remove('on');
  }, 80);
}

function copyPw() {
  if (!lastPw) return;
  cpText(lastPw);
  let btn = document.getElementById('copy-btn');
  btn.classList.add('ok'); btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('ok'); btn.textContent = t('copy'); }, 2000);
}

function cpText(txt) {
  navigator.clipboard.writeText(txt).then(() => {
    let toast = document.getElementById('toast');
    toast.classList.add('on');
    setTimeout(() => toast.classList.remove('on'), 1800);
  });
}

function onLen(v) { document.getElementById('len-val').textContent = v; if (lastPw) generate(); }

function toggle(key, cb) {
  cfg[key] = cb.checked;
  document.getElementById('c-' + key).classList.toggle('on', cb.checked);
  if (lastPw) generate();
}

function changeQty(d) {
  qty = Math.max(1, Math.min(20, qty + d));
  document.getElementById('qty-val').textContent = qty;
}

generate();

