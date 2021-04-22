{ // ブロックスコープ(START)
	"use strict";
	
// 色のデータリストを配列として作っておく
const aColorList = [
	// 黒系
	["#000000", "colorKuro", "黒", "くろ", "colorSiro"],
	["#080000", "colorSikkoku", "漆黒", "しっこく", "colorSiro"],
	["#0C0C0C", "colorRoiro", "呂色", "ろいろ", "colorSiro"],
	["#000B00", "colorNuregarasu", "濡烏", "ぬれがらす", "colorSiro"],
	["#343434", "colorSumiiro", "墨色", "すみいろ", "colorSiro"],
	["#474B42", "colorSensaicha", "仙斎茶", "せんさいちゃ", "colorSiro"],
	// 灰系
	["#433634", "colorKuriiro1", "涅色", "くりいろ", "colorSiro"],
	["#595045", "colorKesizumiiro", "消炭色", "けしずみいろ", "colorSiro"],
	["#727171", "colorNibiiro", "鈍色", "にびいろ", "colorSiro"],
	["#7B7C7D", "colorNamariiro", "鉛色", "なまりいろ", "colorSiro"],
	["#808080", "colorHaiiro", "灰色", "はいいろ", "colorSiro"],
	["#949495", "colorNezumiiro", "鼠色", "ねずみいろ", "colorSiro"],
	["#A3A3A2", "colorUsuzumiiro", "薄墨色", "うすずみいろ", "colorSiro"],
	["#888E7E", "colorRikyuunezu", "利休鼠", "りきゅうねず", "colorSiro"],
	["#BBBCBF", "colorGinnezumi", "銀鼠", "ぎんねずみ", "colorSumiiro"],
	["#C0C0C0", "colorGiniro", "銀色", "ぎんいろ", "colorSumiiro"],
	["#BCB09C", "colorAkuiro", "灰汁色", "あくいろ", "colorSumiiro"],
	["#BFBD9E", "colorYamabatoiro", "山鳩色", "やまばといろ", "colorSumiiro"],
	["#BFBD9E", "colorKikujin", "麹塵", "きくじん", "colorSumiiro"],
	["#AD7984", "colorUmenezumi", "梅鼠", "うめねずみ", "colorSiro"],
	["#CEB4B9", "colorUsuiro", "薄色", "うすいろ", "colorSumiiro"],
	["#E8D3D1", "colorHaizakura", "灰桜", "はいざくら", "colorSumiiro"],
	["#5E7C85", "colorAinezu", "藍鼠", "あいねず", "colorSiro"],
	["#85A1A0", "colorFukagawanezumi", "深川鼠", "ふかがわねずみ", "colorSiro"],
	// 白系
	["#F6F7F8", "colorGeppaku", "月白", "げっぱく", "colorSumiiro"],
	["#FBFBF6", "colorTnohanairo", "卯の花色", "うのはないろ", "colorSumiiro"],
	["#FFFFFF", "colorSiro", "白", "しろ", "colorSumiiro"],
	["#FFFFFB", "colorNyuuhakushoku", "乳白色", "にゅうはくしょく", "colorSumiiro"],
	["#FFF9E2", "colorNeriiro", "練色", "ねりいろ", "colorSumiiro"],
	// 肌系
	["#FFF1CF", "colorTorinokoiro", "鳥の子色", "とりのこいろ", "colorSumiiro"],
	["#F4DDA5", "colorTonokoiro", "砥粉色", "とのこいろ", "colorSumiiro"],
	["#EFCD9A", "colorKouiro", "香色", "こういろ", "colorSumiiro"],
	["#F3BF88", "colorUsukou", "淡香", "うすこう", "colorSumiiro"],
	["#F6B894", "colorAkakouiro", "赤香色", "あかこういろ", "colorSumiiro"],
	["#F0B694", "colorAraigaki", "洗柿", "あらいがき", "colorSumiiro"],
	["#F1BB93", "colorHadairo", "肌色", "はだいろ", "colorSumiiro"],
	["#F3A696", "colorTokiiro", "鴇色", "ときいろ", "colorSumiiro"],
	["#F4A466", "colorAnzuiro", "杏色", "あんずいろ", "colorSumiiro"],
	["#F8B862", "colorKanzouiro", "萱草色", "かんぞういろ", "colorSumiiro"],
	// 赤・桃系
	["#FEEEED", "colorSakurairo", "桜色", "さくらいろ", "colorSumiiro"],
	["#FFD3E4", "colorIkkonzome", "一斤染", "いっこんぞめ", "colorSumiiro"],
	["#F9C1CF", "colorSekichikuiro", "石竹色", "せきちくいろ", "colorSumiiro"],
	["#F6ADC6", "colorNadesikoiro", "撫子色", "なでしこいろ", "colorSumiiro"],
	["#E761A4", "colorTsutsujiiro", "躑躅色", "つつじいろ", "colorSumiiro"],
	["#E761A4", "colorBotaniro", "牡丹色", "ぼたんいろ", "colorSumiiro"],
	["#EB6EA5", "colorAkamurasaki", "赤紫", "あかむらさき", "colorSumiiro"],
	["#E73275", "colorBarairo", "薔薇色", "ばらいろ", "colorSiro"],
	["#E5004F", "colorBeniaka", "紅赤", "べにあか", "colorSiro"],
	["#ED1A3D", "colorAka", "赤", "あか", "colorSiro"],
	["#F58F98", "colorMomoiro", "桃色", "ももいろ", "colorSumiiro"],
	["#E86B79", "colorKoubaiiro", "紅梅色", "こうばいいろ", "colorSumiiro"],
	["#F0908D", "colorHanezuiro", "唐棣色", "はねずいろ", "colorSumiiro"],
	["#F19072", "colorSinonomeiro", "東雲色", "しののめいろ", "colorSumiiro"],
	["#DF7163", "colorAsaake", "浅緋", "あさあけ", "colorSiro"],
	["#F83929", "colorBenihi", "紅緋", "べにひ", "colorSiro"],
	["#E54848", "colorHiiro", "緋色", "ひいろ", "colorSiro"],
	["#EF454A", "colorShuiro", "朱色", "しゅいろ", "colorSiro"],
	["#D93448", "colorKarakurenai", "唐紅/韓紅", "からくれない", "colorSiro"],
	["#CE313D", "colorShoujyouhi", "猩々緋", "しょうじょうひ", "colorSiro"],
	["#B13546", "colorAkaneiro", "茜色", "あかねいろ", "colorSiro"],
	["#B3424A", "colorEnjiiro", "臙脂色", "えんじいろ", "colorSiro"],
	["#C22047", "colorBeniiro", "紅色", "べにいろ/くれないいろ", "colorSiro"],
	["#AD002D", "colorGureniro", "紅蓮色", "ぐれんいろ", "colorSiro"],
	["#B1063A", "colorSinku", "真紅", "しんく", "colorSiro"],
	["#B15C65", "colorUsukurenai", "薄紅", "うすくれない", "colorSiro"],
	["#D0576B", "colorImayouiro", "今様色", "いまよういろ", "colorSiro"],
	["#BB5561", "colorIchigoiro", "苺色", "いちごいろ", "colorSiro"],
	["#85403A", "colorTobiiro", "鳶色", "とびいろ", "colorSiro"],
	["#864337", "colorSuzumeiro", "雀色", "すずめいろ", "colorSiro"],
	["#973C3F", "colorSuouiro", "蘇芳色", "すおういろ", "colorSiro"],
	["#98514B", "colorAzukiiro", "小豆色", "あずきいろ", "colorSiro"],
	["#6C2C2F", "colorEbicha", "葡萄茶/海老茶", "えびちゃ", "colorSiro"],
	["#542D24", "colorMomosiocha", "百塩茶", "ももしおちゃ", "colorSiro"],
	// 茶系
	["#543F32", "colorKenpouiro", "憲法色", "けんぽういろ", "colorSiro"],
	["#800000", "colorKuriiro2", "栗色", "くりいろ", "colorSiro"],
	["#6C1912", "colorKuriume", "栗梅", "くりうめ", "colorSiro"],
	["#7E0F09", "colorShakudouiro", "赤銅色", "しゃくどういろ", "colorSiro"],
	["#8F2E14", "colorBengarairo", "弁柄色", "べんがらいろ", "colorSiro"],
	["#6A4D32", "colorKogecha", "焦茶", "こげちゃ", "colorSiro"],
	["#6C3424", "colorSabiiro", "錆色", "さびいろ", "colorSiro"],
	["#6D3C14", "colorYoukaniro", "羊羹色", "ようかんいろ", "colorSiro"],
	["#6F514C", "colorSusutakeiro", "煤竹色", "すすたけいろ", "colorSiro"],
	["#716246", "colorKobicha", "媚茶", "こびちゃ", "colorSiro"],
	["#726250", "colorKabacha", "樺茶", "かばちゃ", "colorSiro"],
	["#7B4334", "colorHiwadairo", "桧皮色", "ひわだいろ", "colorSiro"],
	["#896A45", "colorKuchibairo", "朽葉色", "くちばいろ", "colorSiro"],
	["#897845", "colorRikyuucha", "利休茶", "りきゅうちゃ", "colorSiro"],
	["#8C7042", "colorRokoucha", "路考茶", "ろこうちゃ", "colorSiro"],
	["#9F563A", "colorDanjyuuroucha", "団十郎茶", "だんじゅうろうちゃ", "colorSiro"],
	["#A86F4C", "colorKurumiiro", "胡桃色", "くるみいろ", "colorSiro"],
	["#AA5C3F", "colorRengairo", "煉瓦色", "れんがいろ", "colorSiro"],
	["#AB6953", "colorSoho", "赭", "そほ", "colorSiro"],
	["#AD7E4E", "colorSikancha", "芝翫茶", "しかんちゃ", "colorSiro"],
	["#B36C3C", "colorTaishairo", "代赭色", "たいしゃいろ", "colorSiro"],
	["#B4866B", "colorChoujicha", "丁子茶", "ちょうじちゃ", "colorSiro"],
	["#D0826C", "colorAraishu", "洗朱", "あらいしゅ", "colorSumiiro"],
	["#BD7862", "colorKakisibuiro", "柿渋色", "かきしぶいろ", "colorSiro"],
	["#BF794E", "colorRakudairo", "駱駝色", "らくだいろ", "colorSiro"],
	["#C37854", "colorKawarakeiro", "土器色", "かわらけいろ", "colorSiro"],
	["#C39143", "colorOudoiro", "黄土色", "おうどいろ", "colorSiro"],
	["#9D896C", "colorUtsubusiiro", "空五倍子色", "うつぶしいろ", "colorSiro"],
	["#DAC4A5", "colorSiracha", "白茶", "しらちゃ", "colorSumiiro"],
	["#D6C6AF", "colorAmairo", "亜麻色", "あまいろ", "colorSumiiro"],
	["#DABC91", "colorKuwazome", "桑染", "くわぞめ", "colorSumiiro"],
	["#C3B091", "colorKaakiiro", "カーキ色", "かーきいろ", "colorSumiiro"],
	["#AA8C63", "colorNamakabeiro", "生壁色", "なまかべいろ", "colorSiro"],
	["#C2B280", "colorKinariiro", "生成色", "きなりいろ", "colorSumiiro"],
	["#BFA46F", "colorHasibamiiro", "榛色", "はしばみいろ", "colorSiro"],
	["#C7B370", "colorMokuraniro", "木蘭色", "もくらんいろ", "colorSumiiro"],
	["#D0AF4C", "colorKarasiiro", "芥子色", "からしいろ", "colorSumiiro"],
	["#C48847", "colorKitsuneiro", "狐色", "きつねいろ", "colorSumiiro"],
	["#CD8C5C", "colorEdocha", "江戸茶", "えどちゃ", "colorSumiiro"],
	["#D8A373", "colorKyarairo", "伽羅色", "きゃらいろ", "colorSumiiro"],
	["#DB8449", "colorAkakuchiba", "赤朽葉", "あかくちば", "colorSumiiro"],
	["#E4A343", "colorKomugiiro", "小麦色", "こむぎいろ", "colorSumiiro"],
	["#A06705", "colorKaracha", "唐茶", "からちゃ", "colorSiro"],
	["#994C00", "colorChairo", "茶色", "ちゃいろ", "colorSiro"],
	["#B63D1B", "colorBenikabairo", "紅樺色", "べにかばいろ", "colorSiro"],
	["#C5591A", "colorKabairo", "樺色/蒲色", "かばいろ", "colorSumiiro"],
	["#CD6118", "colorAmeiro", "飴色", "あめいろ", "colorSumiiro"],
	["#E0861A", "colorKincha", "金茶", "きんちゃ", "colorSumiiro"],
		// 黄・橙系
	["#F08300", "colorMikaniro", "蜜柑色", "みかんいろ", "colorSiro"],
	["#EA930A", "colorKohakuiro", "琥珀色", "こはくいろ", "colorSiro"],
	["#D99502", "colorKourozen", "黄櫨染", "こうろぜん", "colorSiro"],
	["#EE9D19", "colorYuuouiro", "雄黄色", "ゆうおういろ", "colorSumiiro"],
	["#F8B400", "colorYamabukiiro", "山吹色", "やまぶきいろ", "colorSiro"],
	["#FABF14", "colorUkoniro", "鬱金色", "うこんいろ", "colorSumiiro"],
	["#FFD400", "colorKiiro", "黄色", "きいろ", "colorSumiiro"],
	["#FFD700", "colorKiniro", "金色", "きんいろ/こんじき", "colorSumiiro"],
	["#FCD900", "colorNanohanairo", "菜の花色", "なのはないろ", "colorSumiiro"],
	["#FF5234", "colorKoujiiro", "柑子色", "こうじいろ", "colorSiro"],
	["#F15A22", "colorAkadaidai", "赤橙", "あかだいだい", "colorSiro"],
	["#E45E32", "colorNiiro", "丹色", "にいろ", "colorSiro"],
	["#EC6D51", "colorEntaniro", "鉛丹色", "えんたんいろ", "colorSiro"],
	["#ED6D3D", "colorKakiiro", "柿色", "かきいろ", "colorSiro"],
	["#F12B00", "colorGinshu", "銀朱", "ぎんしゅ", "colorSiro"],
	["#FB3C02", "colorMagaibeni", "紛紅", "まがいべに", "colorSiro"],
	["#FF7F50", "colorSangoiro", "珊瑚色", "さんごいろ", "colorSiro"],
	["#F47A55", "colorOutan", "黄丹", "おうたん/おうに", "colorSiro"],
	["#FFB74C", "colorDaidaiiro", "橙色", "だいだいいろ", "colorSumiiro"],
	["#FCF16E", "colorKihadairo", "黄蘗色", "きはだいろ", "colorSumiiro"],
	["#FFF450", "colorRemoniro", "檸檬色", "れもんいろ", "colorSumiiro"],
	["#FFCC33", "colorAsagiiro1", "浅黄色", "あさぎいろ", "colorSumiiro"],
	["#FFD768", "colorKariyasuiro", "苅安色/刈安色", "かりやすいろ", "colorSumiiro"],
	["#FFD768", "colorKuchinasiiro", "梔子色/支子色", "くちなしいろ", "colorSumiiro"],
	// 緑系
	["#004025", "colorFukamidori", "深緑", "ふかみどり", "colorSiro"],
	["#008000", "colorMidori", "緑", "みどり", "colorSiro"],
	["#3F7735", "colorMatsubairo", "松葉色", "まつばいろ", "colorSiro"],
	["#007B43", "colorTokiwairo", "常磐色", "ときわいろ", "colorSiro"],
	["#22825D", "colorTokusairo", "木賊色", "とくさいろ", "colorSiro"],
	["#A9D159", "colorMoegiiro2", "萌黄色", "もえぎいろ", "colorSumiiro"],
	["#82AE46", "colorHiwamoegi", "鶸萌黄", "ひわもえぎ", "colorSumiiro"],
	["#006C4F", "colorMoegiiro1", "萌葱色", "もえぎいろ", "colorSiro"],
	["#A4CA68", "colorWakabairo", "若葉色", "わかばいろ", "colorSumiiro"],
	["#C7DC68", "colorWakanaeiro", "若苗色", "わかなえいろ", "colorSumiiro"],
	["#CCDE68", "colorWakanairo", "若菜色", "わかないろ", "colorSumiiro"],
	["#78882D", "colorKokeiro", "苔色", "こけいろ", "colorSiro"],
	["#7B8D42", "colorKusairo", "草色", "くさいろ", "colorSiro"],
	["#918D40", "colorUguisuiro", "鶯色", "うぐいすいろ", "colorSiro"],
	["#616B07", "colorYomogiiro", "蓬色", "よもぎいろ", "colorSiro"],
	["#ABC900", "colorWakakusairo", "若草色", "わかくさいろ", "colorSumiiro"],
	["#B9C42F", "colorKimidoriiro", "黄緑色", "きみどりいろ", "colorSumiiro"],
	["#5BAD92", "colorRokushou", "緑青", "ろくしょう", "colorSiro"],
	["#60B49F", "colorSeijiiro", "青磁色", "せいじいろ", "colorSiro"],
	["#72BAA7", "colorAotakeiro", "青竹色", "あおたけいろ", "colorSiro"],
	["#8EC298", "colorWasabiiro", "山葵色", "わさびいろ", "colorSumiiro"],
	["#6E6636", "colorRikancha", "璃寛茶", "りかんちゃ", "colorSiro"],
	["#6E6B41", "colorMiruiro", "海松色", "みるいろ", "colorSiro"],
	["#715C1F", "colorUguisucha", "鶯茶", "うぐいすちゃ", "colorSiro"],
	["#7B6C3E", "colorKokuboushoku", "国防色", "こくぼうしょく", "colorSiro"],
	["#858954", "colorAoni", "青丹", "あおに", "colorSiro"],
	["#908E65", "colorNegisiiro", "根岸色", "ねぎしいろ", "colorSumiiro"],
	["#769164", "colorOitakeiro", "老竹色", "おいたけいろ", "colorSiro"],
	["#A5CD89", "colorWakamidori", "若緑", "わかみどり", "colorSumiiro"],
	["#A8C97F", "colorYanagiiro", "柳色", "やなぎいろ", "colorSumiiro"],
	["#B0CA71", "colorNaeiro", "苗色", "なえいろ", "colorSumiiro"],
	["#7CC28E", "colorWakatakeiro", "若竹色", "わかたけいろ", "colorSumiiro"],
	["#9BCF97", "colorAsamidori", "浅緑", "あさみどり", "colorSumiiro"],
	["#E0EBAF", "colorWakameiro", "若芽色", "わかめいろ", "colorSumiiro"],
	["#C1D8AC", "colorUrahayanagi", "裏葉柳", "うらはやなぎ", "colorSumiiro"],
	["#DAEAD0", "colorByakuroku", "白緑", "びゃくろく", "colorSumiiro"],
	// 青系
	["#8CD2BC", "colorMizuasagi", "水浅葱", "みずあさぎ", "colorSumiiro"],
	["#00A4AC", "colorAsagiiro2", "浅葱色", "あさぎいろ", "colorSiro"],
	["#008899", "colorNandoiro", "納戸色", "なんどいろ", "colorSiro"],
	["#0090A8", "colorAomidori", "青緑", "あおみどり", "colorSiro"],
	["#003149", "colorTetsukon", "鉄紺", "てつこん", "colorSiro"],
	["#324356", "colorAonibiiro", "青鈍色", "あおにびいろ", "colorSiro"],
	["#002E4E", "colorKoiai", "濃藍", "こいあい/こあい", "colorSiro"],
	["#165E83", "colorAiiro", "藍色", "あいいろ", "colorSiro"],
	["#211E55", "colorKonkikyou", "紺桔梗", "こんききょう", "colorSiro"],
	["#1C305C", "colorTomekon", "留紺", "とめこん", "colorSiro"],
	["#1A4472", "colorKonjyouiro", "紺青色", "こんじょういろ", "colorSiro"],
	["#233B6C", "colorKoniro", "紺色", "こんいろ", "colorSiro"],
	["#0067C0", "colorAo", "青", "あお", "colorSiro"],
	["#267CA7", "colorHanadairo", "縹色", "はなだいろ", "colorSiro"],
	["#2A5CAA", "colorRuriiro", "瑠璃色", "るりいろ", "colorSiro"],
	["#465DAA", "colorGunjyouiro", "群青色", "ぐんじょういろ", "colorSiro"],
	["#224B8F", "colorRurikon", "瑠璃紺", "るりこん", "colorSiro"],
	["#4D5269", "colorKachiiro", "勝色", "かちいろ/かついろ", "colorSiro"],
	["#5B7E91", "colorMasuhanairo", "枡花色", "ますはないろ", "colorSiro"],
	["#5C9291", "colorSabiasagi", "錆浅葱", "さびあさぎ", "colorSiro"],
	["#92B5A9", "colorChigusairo", "千草色", "ちぐさいろ", "colorSumiiro"],
	["#9CC5E6", "colorWasurenagusairo", "勿忘草色", "わすれなぐさいろ", "colorSumiiro"],
	["#21A0DB", "colorTsuyukusairo", "露草色", "つゆくさいろ", "colorSiro"],
	["#59B9C6", "colorSinbasiiro", "新橋色", "しんばしいろ", "colorSiro"],
	["#83CCD2", "colorByakugun", "白群", "びゃくぐん", "colorSumiiro"],
	["#90D7EC", "colorSorairo", "空色", "そらいろ", "colorSumiiro"],
	["#AFDFE4", "colorMizuiro", "水色", "みずいろ", "colorSumiiro"],
	["#BCE1DF", "colorUsumizuiro", "薄水色", "うすみずいろ", "colorSumiiro"],
	["#C5E4ED", "colorKamenozoki", "瓶覗", "かめのぞき", "colorSumiiro"],
	["#606DA1", "colorFujinando", "藤納戸", "ふじなんど", "colorSiro"],
	// 紫系
	["#6967AB", "colorRindouiro", "竜胆色", "りんどういろ", "colorSiro"],
	["#6A4C9C", "colorKikyouiro", "桔梗色", "ききょういろ", "colorSiro"],
	["#6F51A1", "colorAomurasaki", "青紫", "あおむらさき", "colorSiro"],
	["#705DA8", "colorSumireiro", "菫色", "すみれいろ", "colorSiro"],
	["#745399", "colorEdomurasaki", "江戸紫", "えどむらさき", "colorSiro"],
	["#400B36", "colorSikon", "紫紺", "しこん", "colorSiro"],
	["#640125", "colorEbiiro", "葡萄色/海老色", "えびいろ", "colorSiro"],
	["#A757A8", "colorMurasaki", "紫", "むらさき", "colorSiro"],
	["#B168A8", "colorAyameiro", "菖蒲色", "あやめいろ", "colorSiro"],
	["#772F6D", "colorKyoumurasaki", "京紫", "きょうむらさき", "colorSiro"],
	["#7F1184", "colorKaimurasakiiro", "貝紫色", "かいむらさきいろ", "colorSiro"],
	["#7A4171", "colorEbizome", "葡萄染", "えびぞめ", "colorSiro"],
	["#513743", "colorNisemurasaki", "似紫", "にせむらさき", "colorSiro"],
	["#594255", "colorMessi", "滅紫", "めっし/けしむらさき", "colorSiro"],
	["#5E3862", "colorKakitsubatairo", "杜若色", "かきつばたいろ", "colorSiro"],
	["#6B4978", "colorFutaai", "二藍", "ふたあい", "colorSiro"],
	["#824880", "colorNasukon", "茄子紺", "なすこん", "colorSiro"],
	["#8C6589", "colorKodaimurasaki", "古代紫", "こだいむらさき", "colorSiro"],
	["#95859C", "colorHatobairo", "鳩羽色", "はとばいろ", "colorSiro"],
	["#966F9C", "colorMurasakinibi", "紫鈍", "むらさきにび", "colorSiro"],
	["#968ABD", "colorSioniro", "紫苑色", "しおんいろ", "colorSiro"],
	["#9B95C9", "colorFujimurasaki", "藤紫", "ふじむらさき", "colorSiro"],
	["#A596C7", "colorOuchiiro", "楝色", "おうちいろ", "colorSiro"],
	["#AFB4DB", "colorFujiiro", "藤色", "ふじいろ", "colorSiro"],
];

// 色のデータリスト配列のひな形をClassオブジェクトで作る
// 単なるデータの羅列ではなく、ラベリングをして使用するため
class Colors {
	constructor(_colorCode, _className, _kanji, _kana, _textColor) {
		this.colorCode = _colorCode; // 
		this.className = _className; // 
		this.kanji = _kanji; // 
		this.kana = _kana; // 
		this.textColor = _textColor; // 
	}
}
const aColors = new Array(); // classオブジェクト形式の色のデータリスト配列を入れるための配列

// classオブジェクトの形式で改めて配列に入れなおす
// ※：事前にaColorListを作らず直接入れられないか？
for (let data of aColorList) {
	const pushColor = new Colors(data[0], data[1], data[2], data[3], data[4]);
	aColors.push(pushColor);
}

// 色コードを作成しHTMLへ挿入表示
for (let data of aColors) {
	const palette = document.getElementById("palette"); // 結果を表示する領域の要素取得
	const makeCode = `<div id="${data.className}" class="palette__item ${data.className}" title="${data.kana}">${data.kanji}</div>`; // 色コード作成
	palette.insertAdjacentHTML("beforeend", makeCode); // 作成したコードをHTMLへ挿入表示
}


let aSelectedColor = new Array(); // 選択された色に関するコードをためておく配列

// クリックされた要素と一致する色をidを使って探し、配列aColorsの場所（index）を返す
// ※：for文を回さずにぴたっとindexを返すメソッドはないか？
const colorDataFindOut = (_this) => {
	for (let i = 0; aColors.length > i; i++) {
		if (_this.id === aColors[i].className) {
			return i;
		}
	}
};

// Sassコードを配列に追加・削除する
// ・追加　まだ選択されていない色がクリックされた場合のみ「選択」とみなし配列に追加する
// ・削除　すでに選択されている同じ色がクリックされた場合は「解除」とみなし配列から削除する
const selectedColorAddOrDelete = (_this, _dataIndex) => {
	const colorVar = aColors[_dataIndex].className; // 変数名をセット
	const colorCode = aColors[_dataIndex].colorCode; // 16進数形式のカラーコードをセット
	const colorName = aColors[_dataIndex].kanji; // 色名をセット
	const makeCode = `$${colorVar}: ${colorCode}; // ${colorName}\n`; // Sassで使う形に整形する
	const duplicationIndex = aSelectedColor.indexOf(makeCode); // 配列に同じ色が無ければ -1が入る。有ればそのインデックスが入る
	if (aSelectedColor.length === 0 || duplicationIndex === -1) {
		aSelectedColor.push(makeCode); // 配列に無いSassコードであれば追加
	} else {
		aSelectedColor = aSelectedColor.filter(val => val !== aSelectedColor[duplicationIndex]); // すでに配列に有るSassコードは削除
	}
	_this.classList.toggle("selected"); // クリックされた色にクラス名 selected がついていれば消す。なければつける
};

// 選択された色を表示する
const resultView = document.getElementById("resultView"); // 結果を表示する領域の要素取得
const selectedColorView = () => {
	resultView.textContent = ""; // 表示コードを表示するたびにクリアする
	for (let viewCode of aSelectedColor) {
		resultView.insertAdjacentHTML("beforeend", viewCode); // 作成したコードをHTMLへ挿入表示
	}
};

// コピー処理
const copyProcess = () => {
	resultView.select(); // コピーするコードリストを選択
  document.execCommand("copy"); // コードをコピーしてクリップボードへ
};

// 色をクリックされたときの対応
const colorPalette = document.querySelectorAll("#palette .palette__item"); // 全色の要素取得
for (let color of colorPalette) {
	color.addEventListener("click", function() {
		const dataIndex = colorDataFindOut(this); // クリックされた要素と一致する色をidを使って探し、配列aColorsの場所（index）を受け取る
		selectedColorAddOrDelete(this, dataIndex); // Sassコードを配列に追加・削除する
		selectedColorView(); // 選択された色を表示する
  });
}

// コピーボタンがクリックされたときの対応
const copyBtn = document.getElementById("copyBtn"); // コピーボタンの要素取得
copyBtn.addEventListener("click", function() {
	if (resultView.textContent) { // HTMLへ書き出されていればコピー処理を行う
		copyProcess(); // コピー処理
	}
});

	

} // ブロックスコープ(END)
	