/* Basket — interface string table.
   One row per key, one column per language. This is the externalised string
   resource described in Chapter Three: a language is a column, not a build.
   Adding a fifth language costs a translation, not a rebuild.

   NOTE: the Hausa, Igbo and Yoruba strings need native-speaker verification
   before any real field session. Verify by rendering, not only by reading —
   the test is whether the translated string still fits the control it sits in. */

window.LANGS = [
  { code: 'en', name: 'English',  native: 'English' },
  { code: 'ha', name: 'Hausa',    native: 'Harshen Hausa' },
  { code: 'ig', name: 'Igbo',     native: 'Asụsụ Igbo' },
  { code: 'yo', name: 'Yorùbá',   native: 'Èdè Yorùbá' },
];

window.STRINGS = {
  /* ---------------------------------------------------------- app + common */
  'app.name':            { en: 'Basket',            ha: 'Basket',            ig: 'Basket',            yo: 'Basket' },
  'app.tagline':         { en: 'Sell your harvest at the right price', ha: 'Sayar da amfanin gonarka a farashi mai kyau', ig: 'Ree ihe ubi gị na ezigbo ọnụ ahịa', yo: 'Ta irè oko rẹ ní owó tó tọ́' },
  'common.continue':     { en: 'Continue',          ha: 'Ci gaba',           ig: "Gaa n'ihu",         yo: 'Tẹ̀síwájú' },
  'common.back':         { en: 'Back',              ha: 'Koma',              ig: 'Laghachi',          yo: 'Padà' },
  'common.yes':          { en: 'Yes',               ha: 'Eh',                ig: 'Ee',                yo: 'Bẹ́ẹ̀ni' },
  'common.no':           { en: 'No',                ha: "A'a",               ig: 'Mba',               yo: 'Rárá' },
  'common.cancel':       { en: 'Cancel',            ha: 'Soke',              ig: 'Kagbuo',            yo: 'Fagilé' },
  'common.done':         { en: 'Done',              ha: 'An gama',           ig: 'Emechaala',         yo: 'Ó parí' },
  'common.listen':       { en: 'Tap to listen',     ha: 'Danna ka saurara',  ig: 'Pịa ịnụ',           yo: 'Tẹ̀ láti gbọ́' },
  'common.home':         { en: 'Home',              ha: 'Gida',              ig: 'Ụlọ',               yo: 'Ilé' },
  'common.prices':       { en: 'Prices',            ha: 'Farashi',           ig: 'Ọnụ ahịa',          yo: 'Owó' },
  'common.browse':       { en: 'Browse',            ha: 'Duba',              ig: 'Chọgharịa',         yo: 'Wò' },
  'common.me':           { en: 'Me',                ha: 'Ni',                ig: 'Mụ',                yo: 'Èmi' },
  'common.bag':          { en: 'bag',               ha: 'buhu',              ig: 'akpa',              yo: 'àpò' },
  'common.bags':         { en: 'bags',              ha: 'buhuna',            ig: 'akpa',              yo: 'àpò' },
  'common.basket':       { en: 'basket',            ha: 'kwando',            ig: 'nkata',             yo: 'agbọ̀n' },
  'common.baskets':      { en: 'baskets',           ha: 'kwanduna',          ig: 'nkata',             yo: 'agbọ̀n' },
  'common.kilo':         { en: 'kilo',              ha: 'kilo',              ig: 'kilo',              yo: 'kílò' },

  /* ------------------------------------------------------------- onboarding */
  'lang.title':          { en: 'Choose your language', ha: 'Zaɓi harshenka', ig: 'Họrọ asụsụ gị',     yo: 'Yan èdè rẹ' },
  'role.title':          { en: 'What do you want to do?', ha: 'Me kake son yi?', ig: 'Gịnị ka ị chọrọ ime?', yo: 'Kí ni o fẹ́ ṣe?' },
  'role.sell':           { en: 'Sell my produce',   ha: 'Sayar da amfanina', ig: 'Ree ihe ubi m',     yo: 'Ta irè oko mi' },
  'role.sell.sub':       { en: 'Put your harvest on the market', ha: 'Kai amfanin gonarka kasuwa', ig: 'Tinye ihe ubi gị n’ahịa', yo: 'Gbé irè oko rẹ sí ọjà' },
  'role.buy':            { en: 'Buy produce',       ha: 'Sayi amfanin gona', ig: 'Zụta ihe ubi',      yo: 'Ra irè oko' },
  'role.buy.sub':        { en: 'Find farmers selling near you', ha: 'Nemo manoma kusa da kai', ig: 'Chọta ndị ọrụ ubi gbara gị gburugburu', yo: 'Wá àwọn àgbẹ̀ tó wà nítòsí rẹ' },
  'phone.title':         { en: 'Your phone number', ha: 'Lambar wayarka',    ig: 'Nọmba ekwentị gị',  yo: 'Nọ́mbà fóònù rẹ' },
  'phone.sub':           { en: 'We will send a code to be sure it is you.', ha: 'Za mu aika da lamba don tabbatar da kai ne.', ig: 'Anyị ga-eziga koodu iji chọpụta na ọ bụ gị.', yo: 'A ó fi kóòdù ránṣẹ́ láti rí i dájú pé ìwọ ni.' },
  'verify.title':        { en: 'Enter the code we sent', ha: 'Shigar da lambar da muka aika', ig: 'Tinye koodu anyị zigara', yo: 'Tẹ kóòdù tí a fi ránṣẹ́' },
  'verify.sub':          { en: 'Four numbers. Tap the speaker to hear them.', ha: 'Lambobi huɗu. Danna mai magana ka ji su.', ig: 'Ọnụọgụ anọ. Pịa ihe ọkụ iji nụ ha.', yo: 'Nọ́mbà mẹ́rin. Tẹ agbohùn láti gbọ́ wọn.' },

  /* ------------------------------------------------------------------- home */
  'home.greeting':       { en: 'Welcome back',      ha: 'Barka da dawowa',   ig: 'Nnọọ',              yo: 'Káàbọ̀' },
  'home.sell':           { en: 'Sell my produce',   ha: 'Sayar da amfanina', ig: 'Ree ihe ubi m',     yo: 'Ta irè oko mi' },
  'home.sell.sub':       { en: 'Put your harvest on the market', ha: 'Kai amfanin gonarka kasuwa', ig: 'Tinye ihe ubi gị n’ahịa', yo: 'Gbé irè oko rẹ sí ọjà' },
  'home.prices':         { en: 'Today’s prices',    ha: 'Farashin yau',      ig: 'Ọnụ ahịa taa',      yo: 'Owó òde òní' },
  'home.listings':       { en: 'My listings',       ha: 'Kayana a kasuwa',   ig: 'Ihe m depụtara',    yo: 'Àwọn nǹkan mi' },
  'home.near':           { en: 'Near you today',    ha: 'Kusa da kai yau',   ig: 'Nso gị taa',        yo: 'Nítòsí rẹ lónìí' },
  'home.hear':           { en: 'Tap to hear this page', ha: 'Danna ka ji wannan shafi', ig: 'Pịa ịnụ peeji a', yo: 'Tẹ̀ láti gbọ́ ojú ìwé yìí' },

  /* -------------------------------------------------------------- sell flow */
  'sell.crop.title':     { en: 'What are you selling?', ha: 'Me kake sayarwa?', ig: 'Kedu ihe ị na-ere?', yo: 'Kí ni o ń tà?' },
  'sell.crop.hint':      { en: 'Tap the picture of your crop', ha: 'Danna hoton amfanin gonarka', ig: 'Pịa foto nke ihe ọkụkụ gị', yo: 'Tẹ àwòrán irè oko rẹ' },
  'sell.qty.title':      { en: 'How much do you have?', ha: 'Nawa kake da shi?', ig: 'Ego ole ka i nwere?', yo: 'Mélòó ni o ní?' },
  'sell.qty.measure':    { en: 'MEASURE',           ha: 'MA’AUNI',           ig: 'IHE ỌTỤTỤ',         yo: 'ÌWỌ̀N' },
  'sell.qty.howmany':    { en: 'HOW MANY',          ha: 'NAWA',              ig: 'OLE',               yo: 'MÉLÒÓ' },
  'sell.qty.note':       { en: 'Bags and baskets first. Kilos last — because that is how the market talks.', ha: 'Buhu da kwando da farko. Kilo a ƙarshe — haka kasuwa take magana.', ig: 'Akpa na nkata buru ụzọ. Kilo ikpeazụ — otú ahụ ka ahịa si ekwu.', yo: 'Àpò àti agbọ̀n ni àkọ́kọ́. Kílò ni ìkẹyìn — bẹ́ẹ̀ ni ọjà ṣe ń sọ̀rọ̀.' },
  'sell.price.title':    { en: 'What price do you want?', ha: 'Wane farashi kake so?', ig: 'Ọnụ ahịa ole ka ị chọrọ?', yo: 'Owó wo ni o fẹ́?' },
  'sell.price.forone':   { en: 'For one',           ha: 'Don ɗaya',          ig: 'Maka otu',          yo: 'Fún ọ̀kan' },
  'sell.price.market':   { en: 'Market today',      ha: 'Kasuwa yau',        ig: 'Ahịa taa',          yo: 'Ọjà lónìí' },
  'sell.review.title':   { en: 'Check before you publish', ha: 'Duba kafin ka tura', ig: 'Lelee tupu i bipụta', yo: 'Yẹ̀ wò kí o tó gbé jáde' },
  'sell.review.priceone':{ en: 'Price for one',     ha: 'Farashin ɗaya',     ig: 'Ọnụ ahịa otu',      yo: 'Owó ọ̀kan' },
  'sell.review.hear':    { en: 'Hear this before publishing', ha: 'Ji wannan kafin ka tura', ig: 'Nụrụ nke a tupu ibipụta', yo: 'Gbọ́ èyí kí o tó gbé jáde' },
  'sell.review.notyet':  { en: 'Not published yet', ha: 'Ba a tura ba tukuna', ig: 'E bipụtabeghị ya', yo: 'A kò tíì gbé e jáde' },
  'sell.publish':        { en: 'Publish my listing', ha: 'Tura kayana kasuwa', ig: 'Bipụta ihe m',     yo: 'Gbé e jáde sí ọjà' },
  'sell.savelater':      { en: 'Save and finish later', ha: 'Ajiye ka gama daga baya', ig: 'Chekwaa ka i mechaa emesịa', yo: 'Fi pamọ́ kí o parí lẹ́yìn' },
  'sell.done.title':     { en: 'Your listing is live', ha: 'Kayanka yana kasuwa yanzu', ig: 'Ihe gị adịla n’ahịa', yo: 'Ohun rẹ ti wà lọ́jà' },
  'sell.done.sub':       { en: 'Buyers near you can see it now.', ha: 'Masu saye kusa da kai suna ganin sa yanzu.', ig: 'Ndị na-azụ ahịa gbara gị gburugburu na-ahụ ya ugbu a.', yo: 'Àwọn tó ń rà nítòsí rẹ ti rí i báyìí.' },
  'sell.done.see':       { en: 'See my listing',    ha: 'Duba kayana',       ig: 'Hụ ihe m',          yo: 'Wo ohun mi' },
  'sell.done.home':      { en: 'Back to home',      ha: 'Koma gida',         ig: 'Laghachi ụlọ',      yo: 'Padà sí ilé' },

  /* ----------------------------------------------------------------- status */
  'status.published':    { en: 'Published',         ha: 'An tura',           ig: 'E bipụtala',        yo: 'A ti gbé jáde' },
  'status.published.sub':{ en: 'Buyers can see it', ha: 'Masu saye suna gani', ig: 'Ndị na-azụ ahịa na-ahụ ya', yo: 'Àwọn tó ń rà lè rí i' },
  'status.sending':      { en: 'Sending…',          ha: 'Ana turawa…',       ig: 'Na-eziga…',         yo: 'Ń fi ránṣẹ́…' },
  'status.sending.sub':  { en: 'Will send when network returns', ha: 'Za a tura idan network ya dawo', ig: 'Ọ ga-eziga mgbe netwọk lọghachiri', yo: 'Yóò fi ránṣẹ́ nígbà tí nẹ́tíwọ̀kì bá padà' },
  'status.draft':        { en: 'Saved, not sent',   ha: 'An ajiye, ba a tura ba', ig: 'E chekwara, e zigaghị ya', yo: 'A fi pamọ́, kò tíì lọ' },
  'status.draft.sub':    { en: 'Finish it to publish', ha: 'Ka gama don ka tura', ig: 'Mechaa ya ka i bipụta', yo: 'Parí rẹ̀ kí o lè gbé jáde' },
  'status.offline':      { en: 'Working offline — your work is saved', ha: 'Ana aiki ba tare da network ba — an ajiye aikinka', ig: 'Na-arụ ọrụ na-enweghị netwọk — e chekwara ọrụ gị', yo: 'Ń ṣiṣẹ́ láìsí nẹ́tíwọ̀kì — a ti fi iṣẹ́ rẹ pamọ́' },

  /* ----------------------------------------------------------------- prices */
  'prices.title':        { en: 'Today’s prices',    ha: 'Farashin yau',      ig: 'Ọnụ ahịa taa',      yo: 'Owó òde òní' },
  'prices.sub':          { en: 'Eruwa market',      ha: 'Kasuwar Eruwa',     ig: 'Ahịa Eruwa',        yo: 'Ọjà Eruwa' },
  'prices.lowest':       { en: 'Lowest',            ha: 'Mafi ƙaranci',      ig: 'Kacha ala',         yo: 'Tó kéré jù' },
  'prices.highest':      { en: 'Highest',           ha: 'Mafi yawa',         ig: 'Kacha elu',         yo: 'Tó ga jù' },
  'prices.hear':         { en: 'Hear today’s price', ha: 'Ji farashin yau',  ig: 'Nụrụ ọnụ ahịa taa', yo: 'Gbọ́ owó òní' },
  'prices.sellmine':     { en: 'Sell mine',         ha: 'Sayar da nawa',     ig: 'Ree nke m',         yo: 'Ta tèmi' },

  /* ----------------------------------------------------------------- browse */
  'browse.title':        { en: 'Produce near you',  ha: 'Amfanin gona kusa da kai', ig: 'Ihe ubi nso gị', yo: 'Irè oko nítòsí rẹ' },
  'browse.sub':          { en: 'Within 10 km',      ha: 'Cikin kilomita 10', ig: 'N’ime kilomita 10', yo: 'Nínú kìlómítà 10' },
  'browse.search':       { en: 'Search crops near you', ha: 'Nemo amfanin gona kusa da kai', ig: 'Chọọ ihe ubi nso gị', yo: 'Wá irè oko nítòsí rẹ' },
  'browse.filter':       { en: 'Filter',            ha: 'Tace',              ig: 'Nzacha',            yo: 'Ṣàyẹ̀wò' },
  'browse.crop':         { en: 'CROP',              ha: 'AMFANIN GONA',      ig: 'IHE ỌKỤKỤ',         yo: 'IRÈ OKO' },
  'browse.howfar':       { en: 'HOW FAR',           ha: 'NISA NAWA',         ig: 'EBE DỊ ANYA',       yo: 'ÒKÈÈRÈ MÉLÒÓ' },
  'browse.sortby':       { en: 'SORT BY',           ha: 'JERA DA',           ig: 'HAZIE SITE NA',     yo: 'TÒ NÍPA' },
  'browse.nearest':      { en: 'Nearest',           ha: 'Mafi kusa',         ig: 'Kacha nso',         yo: 'Tó sún mọ́ jù' },
  'browse.cheapest':     { en: 'Cheapest',          ha: 'Mafi arha',         ig: 'Kacha ọnụ ala',     yo: 'Tó pọ̀n jù' },
  'browse.newest':       { en: 'Newest',            ha: 'Sabo',              ig: 'Kacha ọhụrụ',       yo: 'Tuntun jù' },
  'browse.show':         { en: 'Show listings',     ha: 'Nuna kaya',         ig: 'Gosi ihe ndị dị',   yo: 'Fi àwọn nǹkan hàn' },
  'browse.away':         { en: 'away',              ha: 'nisa',              ig: 'n’ebe dị anya',     yo: 'sí òkèèrè' },
  'browse.available':    { en: 'available',         ha: 'akwai',             ig: 'dị',                yo: 'wà' },

  /* ---------------------------------------------------------------- listing */
  'listing.contact':     { en: 'Contact seller',    ha: 'Tuntuɓi mai sayarwa', ig: 'Kpọtụrụ onye na-ere', yo: 'Kàn sí olùtà' },
  'listing.hear':        { en: 'Hear this listing', ha: 'Ji wannan',         ig: 'Nụrụ nke a',        yo: 'Gbọ́ èyí' },
  'contact.title':       { en: 'How do you want to reach them?', ha: 'Ta yaya kake son tuntuɓar su?', ig: 'Kedu ka ị chọrọ isi kpọtụrụ ha?', yo: 'Báwo ni o fẹ́ fi kàn sí wọn?' },
  'contact.call':        { en: 'Call now',          ha: 'Kira yanzu',        ig: 'Kpọọ ugbu a',       yo: 'Pè ní báyìí' },
  'contact.call.sub':    { en: 'Talk on the phone', ha: 'Yi magana a waya',  ig: 'Kwuo okwu na ekwentị', yo: 'Sọ̀rọ̀ lórí fóònù' },
  'contact.whatsapp':    { en: 'WhatsApp',          ha: 'WhatsApp',          ig: 'WhatsApp',          yo: 'WhatsApp' },
  'contact.whatsapp.sub':{ en: 'Send a message',    ha: 'Aika saƙo',         ig: 'Zipu ozi',          yo: 'Fi ìfiránṣẹ́ ránṣẹ́' },
  'contact.sms':         { en: 'SMS',               ha: 'SMS',               ig: 'SMS',               yo: 'SMS' },
  'contact.sms.sub':     { en: 'Send a text message', ha: 'Aika saƙon rubutu', ig: 'Zipu ozi ederede', yo: 'Fi ìkọ̀wé ránṣẹ́' },
  'contact.privacy':     { en: 'Your number is shared only when you call.', ha: 'Ana raba lambarka kawai idan ka kira.', ig: 'A na-ekekọrịta nọmba gị naanị mgbe ị kpọrọ.', yo: 'A ó pín nọ́mbà rẹ nìkan nígbà tí o bá pè.' },

  /* -------------------------------------------------------------- enquiries */
  'enq.title':           { en: 'Enquiries',         ha: 'Tambayoyi',         ig: 'Ajụjụ',             yo: 'Ìbéèrè' },
  'enq.sub':             { en: 'Buyers who asked about your produce', ha: 'Masu saye da suka tambaya game da amfaninka', ig: 'Ndị na-azụ ahịa jụrụ maka ihe ubi gị', yo: 'Àwọn tó béèrè nípa irè oko rẹ' },
  'enq.new':             { en: 'New',               ha: 'Sabo',              ig: 'Ọhụrụ',             yo: 'Tuntun' },
  'enq.replied':         { en: 'Replied',           ha: 'An amsa',           ig: 'Azaala',            yo: 'A ti dáhùn' },

  /* ---------------------------------------------------------------- profile */
  'profile.title':       { en: 'Me',                ha: 'Ni',                ig: 'Mụ',                yo: 'Èmi' },
  'profile.language':    { en: 'Language',          ha: 'Harshe',            ig: 'Asụsụ',             yo: 'Èdè' },
  'profile.readaloud':   { en: 'Read aloud',        ha: 'Karanta da ƙarfi',  ig: 'Gụpụta n’olu dara ụda', yo: 'Kà á sókè' },
  'profile.help':        { en: 'Help',              ha: 'Taimako',           ig: 'Enyemaka',          yo: 'Ìrànlọ́wọ́' },
  'profile.signout':     { en: 'Sign out',          ha: 'Fita',              ig: 'Pụọ',               yo: 'Jáde' },
  'profile.on':          { en: 'On',                ha: 'A kunne',           ig: 'Gbanyere',          yo: 'Ó ń ṣiṣẹ́' },

  /* ------------------------------------------------------------ transaction */
  'tx.offer.title':      { en: 'Make an offer',     ha: 'Bayar da farashi',  ig: 'Nye ọnụ ahịa',      yo: 'Dá owó lé e' },
  'tx.offer.yourprice':  { en: 'YOUR PRICE FOR ONE', ha: 'FARASHINKA DON ƊAYA', ig: 'ỌNỤ AHỊA GỊ MAKA OTU', yo: 'OWÓ RẸ FÚN Ọ̀KAN' },
  'tx.offer.youpay':     { en: 'You will pay',      ha: 'Za ka biya',        ig: 'Ị ga-akwụ',         yo: 'Wàá san' },
  'tx.offer.send':       { en: 'Send offer',        ha: 'Tura farashi',      ig: 'Zipu ọnụ ahịa',     yo: 'Fi owó ránṣẹ́' },
  'tx.recv.title':       { en: 'A buyer wants your produce', ha: 'Mai saye yana son amfaninka', ig: 'Onye na-azụ ahịa chọrọ ihe ubi gị', yo: 'Ẹnìkan fẹ́ ra irè oko rẹ' },
  'tx.recv.youget':      { en: 'You will receive',  ha: 'Za ka karɓa',       ig: 'Ị ga-anata',        yo: 'Wàá gbà' },
  'tx.recv.accept':      { en: 'Accept offer',      ha: 'Karɓi farashi',     ig: 'Nabata ọnụ ahịa',   yo: 'Gba owó náà' },
  'tx.recv.decline':     { en: 'Decline',           ha: 'Ƙi',                ig: 'Jụ',                yo: 'Kọ̀' },
  'tx.pay.title':        { en: 'How do you want to pay?', ha: 'Ta yaya kake son biya?', ig: 'Kedu ka ị chọrọ isi kwụọ ụgwọ?', yo: 'Báwo ni o fẹ́ sanwó?' },
  'tx.pay.cash':         { en: 'Cash on collection', ha: 'Kuɗi lokacin ɗauka', ig: 'Ego mgbe ị na-ewere', yo: 'Owó nígbà tí o bá gbà á' },
  'tx.pay.cash.sub':     { en: 'Pay when you collect. Most common.', ha: 'Biya lokacin da ka ɗauka. Shi ne aka fi yi.', ig: 'Kwụọ mgbe ị na-ewere. Ọ bụ ya kacha.', yo: 'San nígbà tí o bá gbà á. Èyí ni ó wọ́pọ̀ jù.' },
  'tx.pay.transfer':     { en: 'Bank transfer',     ha: 'Tura ta banki',     ig: 'Nyefee site na bank', yo: 'Fi báńkì ránṣẹ́' },
  'tx.pay.transfer.sub': { en: 'Money is held until you collect.', ha: 'Ana riƙe kuɗin har sai ka ɗauka.', ig: 'A na-ejide ego ruo mgbe ị na-ewere.', yo: 'A ó di owó mú títí o fi gbà á.' },
  'tx.pay.ussd':         { en: 'USSD',              ha: 'USSD',              ig: 'USSD',              yo: 'USSD' },
  'tx.pay.ussd.sub':     { en: 'Works without internet, on any phone.', ha: 'Yana aiki ba tare da internet ba, a kowace waya.', ig: 'Ọ na-arụ ọrụ na-enweghị ịntanetị, na ekwentị ọ bụla.', yo: 'Ó ń ṣiṣẹ́ láìsí íńtánẹ́ẹ̀tì, lórí fóònù èyíkéyìí.' },
  'tx.transfer.title':   { en: 'Send the money',    ha: 'Tura kuɗin',        ig: 'Zipu ego ahụ',      yo: 'Fi owó náà ránṣẹ́' },
  'tx.transfer.sub':     { en: 'to this account, from any bank app', ha: 'zuwa wannan asusu, daga kowace manhajar banki', ig: 'na akaụntụ a, site na ngwa bank ọ bụla', yo: 'sí àkáǹtì yìí, láti inú app báńkì èyíkéyìí' },
  'tx.transfer.acct':    { en: 'ACCOUNT NUMBER',    ha: 'LAMBAR ASUSU',      ig: 'NỌMBA AKAỤNTỤ',     yo: 'NỌ́MBÀ ÀKÁǸTÌ' },
  'tx.transfer.bank':    { en: 'Bank',              ha: 'Banki',             ig: 'Bank',              yo: 'Báńkì' },
  'tx.transfer.name':    { en: 'Name',              ha: 'Suna',              ig: 'Aha',               yo: 'Orúkọ' },
  'tx.transfer.copy':    { en: 'Copy',              ha: 'Kwafa',             ig: 'Detuo',             yo: 'Ṣàdàkọ' },
  'tx.transfer.held':    { en: 'Your money is held until you confirm you collected.', ha: 'Ana riƙe kuɗinka har sai ka tabbatar ka ɗauka.', ig: 'A na-ejide ego gị ruo mgbe i kwadoro na i weere ya.', yo: 'A ó di owó rẹ mú títí o fi jẹ́rìí pé o ti gbà á.' },
  'tx.transfer.nointernet': { en: 'NO INTERNET?',   ha: 'BABU INTERNET?',    ig: 'ENWEGHỊ ỊNTANETỊ?', yo: 'KÒ SÍ ÍŃTÁNẸ́Ẹ̀TÌ?' },
  'tx.transfer.dial':    { en: 'Dial this on any phone', ha: 'Buga wannan a kowace waya', ig: 'Pịa nke a na ekwentị ọ bụla', yo: 'Tẹ èyí lórí fóònù èyíkéyìí' },
  'tx.transfer.sent':    { en: 'I have sent it',    ha: 'Na tura',           ig: 'Ezigala m ya',      yo: 'Mo ti fi ránṣẹ́' },
  'tx.held.title':       { en: 'Your money is safe', ha: 'Kuɗinka yana lafiya', ig: 'Ego gị dị nchebe', yo: 'Owó rẹ wà láìléwu' },
  'tx.held.sub':         { en: 'held until you collect', ha: 'ana riƙe har sai ka ɗauka', ig: 'a na-ejide ya ruo mgbe ị ga-ewere', yo: 'a dì í mú títí o fi gbà á' },
  'tx.held.step1':       { en: 'Payment received',  ha: 'An karɓi kuɗi',     ig: 'Enwetara ụgwọ',     yo: 'A ti gba owó' },
  'tx.held.step2':       { en: 'You collect the produce', ha: 'Ka ɗauki amfanin', ig: 'Ị na-ewere ihe ubi', yo: 'O gba irè oko náà' },
  'tx.held.step3':       { en: 'The farmer is paid', ha: 'An biya manomi',   ig: 'A kwụrụ onye ọrụ ubi ụgwọ', yo: 'A san owó fún àgbẹ̀ náà' },
  'tx.held.collected':   { en: 'I have collected it', ha: 'Na ɗauka',        ig: 'Eweerela m ya',     yo: 'Mo ti gbà á' },
  'tx.confirm.title':    { en: 'Did the buyer collect?', ha: 'Mai saye ya ɗauka?', ig: 'Onye na-azụ ahịa weere ya?', yo: 'Ṣé ẹni tó ń rà ti gbà á?' },
  'tx.confirm.sub':      { en: 'Say yes only when the produce has changed hands.', ha: 'Ka ce eh kawai idan an mika amfanin.', ig: 'Kwuo ee naanị mgbe e nyefere ihe ubi ahụ.', yo: 'Sọ bẹ́ẹ̀ni nìkan nígbà tí a bá ti fi irè oko náà lé wọn lọ́wọ́.' },
  'tx.confirm.yes':      { en: 'Yes, they collected', ha: 'Eh, sun ɗauka',   ig: 'Ee, ha weere ya',   yo: 'Bẹ́ẹ̀ni, wọ́n ti gbà á' },
  'tx.confirm.notyet':   { en: 'Not yet',           ha: 'Ba tukuna',         ig: 'Ọ ka dịbeghị',      yo: 'Kò tíì' },
  'tx.receipt.paid':     { en: 'paid',              ha: 'an biya',           ig: 'akwụọla',           yo: 'a ti san' },
  'tx.receipt.title':    { en: 'Payment complete',  ha: 'An kammala biya',   ig: 'Ịkwụ ụgwọ zuru ezu', yo: 'Ìsanwó parí' },
  'tx.receipt.hear':     { en: 'Hear this receipt', ha: 'Ji wannan rasit',   ig: 'Nụrụ akwụkwọ nnata a', yo: 'Gbọ́ ìwé ẹ̀rí yìí' },
  'tx.receipt.share':    { en: 'Share receipt',     ha: 'Raba rasit',        ig: 'Kekọrịta akwụkwọ nnata', yo: 'Pín ìwé ẹ̀rí' },
  'tx.receipt.ref':      { en: 'Reference',         ha: 'Lamba',             ig: 'Nrụtụaka',          yo: 'Ìtọ́kasí' },
  'tx.pay.title.short':  { en: 'Payments',          ha: 'Biyan kuɗi',        ig: 'Ịkwụ ụgwọ',         yo: 'Ìsanwó' },
  'tx.pay.waiting':      { en: 'Money waiting for you', ha: 'Kuɗin da ke jiranka', ig: 'Ego na-echere gị', yo: 'Owó tó ń dúró dè ọ́' },
  'tx.pay.tobank':       { en: 'Send to my bank',   ha: 'Tura zuwa bankina', ig: 'Zipu na bank m',    yo: 'Fi ránṣẹ́ sí báńkì mi' },
  'tx.illustrative':     { en: 'Demonstration only — no real money moves.', ha: 'Nuni kawai — babu kuɗi na gaske.', ig: 'Ngosi naanị — ọ dịghị ego n’ezie.', yo: 'Àfihàn nìkan — kò sí owó gidi.' },

  /* ------------------------------------------------------- crops and units */
  'crop.cassava':        { en: 'Cassava',           ha: 'Rogo',              ig: 'Akpụ',              yo: 'Gbaguda' },
  'crop.maize':          { en: 'Maize',             ha: 'Masara',            ig: 'Ọka',               yo: 'Àgbàdo' },
  'crop.yam':            { en: 'Yam',               ha: 'Doya',              ig: 'Ji',                yo: 'Iṣu' },
  'crop.pepper':         { en: 'Pepper',            ha: 'Barkono',           ig: 'Ose',               yo: 'Ata' },
  'crop.tomato':         { en: 'Tomato',            ha: 'Tumatir',           ig: 'Tomato',            yo: 'Tòmátì' },
  'crop.okra':           { en: 'Okra',              ha: 'Kubewa',            ig: 'Ọkwụrụ',            yo: 'Ilá' },
};

/* ------------------------------------------------------- SUS, English only.
   The instrument is administered orally by the facilitator in the
   participant's language; these are the source items. "Cumbersome" is
   replaced by "awkward" following Finstad, because the original does not
   survive oral translation. */
window.SUS_ITEMS = [
  'I think that I would like to use this system frequently.',
  'I found the system unnecessarily complex.',
  'I thought the system was easy to use.',
  'I think that I would need the support of a technical person to be able to use this system.',
  'I found the various functions in this system were well integrated.',
  'I thought there was too much inconsistency in this system.',
  'I would imagine that most people would learn to use this system very quickly.',
  'I found the system very awkward to use.',
  'I felt very confident using the system.',
  'I needed to learn a lot of things before I could get going with this system.',
];
window.SUS_SCALE = {
  en: ['Strongly disagree', 'Disagree', 'Neither', 'Agree', 'Strongly agree'],
  ha: ['Ban yarda ba ko kaɗan', 'Ban yarda ba', 'Tsakiya', 'Na yarda', 'Na yarda sosai'],
  ig: ['Ekwenyeghị m ma ọlị', 'Ekwenyeghị m', 'Etiti', 'Ekwenyere m', 'Ekwenyesiri m ike'],
  yo: ['Mi ò gbà rárá', 'Mi ò gbà', 'Àárín', 'Mo gbà', 'Mo gbà gidigidi'],
};
