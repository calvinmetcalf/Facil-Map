/*
	This file is part of FacilMap.

	FacilMap is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	FacilMap is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with FacilMap.  If not, see <http://www.gnu.org/licenses/>.

	Obtain the source code from http://gitorious.org/facilmap.
*/

/**
 * An implementation of the NameFinder that contacts Nominatim (http://wiki.openstreetmap.org/wiki/Nominatim).
*/
FacilMap.NameFinder.Nominatim = OpenLayers.Class(FacilMap.NameFinder, {
	nameFinderURL : "http://open.mapquestapi.com/nominatim/v1/search",

	/**
	 * List of special phrases from http://wiki.openstreetmap.org/wiki/Nominatim/Special_Phrases
	*/
	specialWords : [
		"Aanlegplaats", "Abandoned Railway", "Acantilado", "Acceso a Internet inalámbrico", "Acceso de emergencia", "Accès WiFi", "Administratieve grens", "Administrative Boundary", "Aéroport", "Aeroporto", "Aeroporto", "Aéroport", "Aeropuerto", "Aeropuerto", "Afstandsmarkering",
		"Afvoerkanaal", "Agence de voyage", "Agencia de viajes", "Agenzia di viaggi", "Agenzia immobiliare", "Agrarisch gebouw", "Agua bebestible", "Agua", "Áin", "Áin", "Aire de jeux", "Aireportu", "Aireportu", "Airport", "Airport",
		"Ajándékbolt", "Albergue", "Aldea", "Aldiri", "Algemene winkel", "Alimentari", "Állatkert", "Allotments", "Almacén", "Almenda", "Alpine Hut", "Alquiler de bicicletas", "Alquiler de vehículos", "Altaar langs de weg", "Altersheim",
		"Altzari", "Amarre", "Amarre", "Ambasciata", "Ambassade", "Ameublement", "Antzokia", "Aparcamiento", "Aparcamiento de bibicletas", "Apartment Block", "Apotheek", "Apotheek", "Apotheek", "Apotheke", "Apparel Shop",
		"Appartementen", "Árbol", "Arbre", "Archaeological Site", "Archeologische vindplaats", "Archeologiske wurywanišćo", "área comercial", "Área de juegos", "Área de pesca", "Área de picnic", "Área de recepción", "Área no incorporada", "Área recreativa", "Arrecife", "Arrêt de bus",
		"Arrêt de bus", "Arrêt de métro", "Arrêt de train historique", "Arrêt de train", "Arrêt de tram", "Arrezife", "Arroyo", "Arts Centre", "Art Shop", "Artwork", "Arzt", "Aseguradora", "Aseos", "Assicurazioni", "Assurance",
		"Astillero", "Aterpe alpinoa", "Aterpe", "Atletiekbaan", "ATM", "Atracción", "Atrakcija", "Atrakzio", "Attractie", "Attraction", "Attraktion", "Auberge", "Auditorio", "Auditorium", "Ausgrabungsstätte",
		"Aussichtspunkt", "Autóalkatrész", "Autobahn", "Autobahnkreuz", "Autobus-geltoki", "Autobus-geraleku", "Autodealer", "Autodelen", "Autoescuela", "Autoeskola", "Autogarage", "Autohaus", "Autohaus", "Autókölcsönző", "Autolavado",
		"Autolavaggio", "Automaat", "Automat", "Automaterialenwinkel", "Autómosó", "Autonoleggio", "Autoonderdelen", "Autoroute en construction", "Autoroute", "Autósiskola", "Autosnelweg", "Autosnelwegknooppunt", "Autosnelwegverbindingsweg", "Autoverhuur", "Autovermietung",
		"Autovía", "Autowaschanlage", "Autowasstraat", "Autoweg", "Autowerkstatt", "Awditorij", "Awditorium", "Awtodroga", "Awtodróha", "Awtodróhowe křižnišćo", "Awtodróhowy wotpočny hosćenc", "Awtomat", "Awtomyjernja", "Awtosalon", "Awtowa porjedźernja",
		"Awtowa přenajimarnja", "Awtowe narunanki", "Ayuntamiento", "Ayuntamiento", "Aztarnategi arkeologiko", "Baai", "Bach", "Bäckerei", "Bác sĩ", "Badia", "Badplaats", "Bærinn", "Bagno", "Bagno", "Bahía",
		"Bahnhof", "Bahnhof", "Bahno", "Bahno", "Bahnsteig", "Baia", "Bãi biển", "Baie", "Bãi Thể thao", "Bakaríið", "Bakery", "Bakkerij", "Banca", "Banc", "Banco",
		"Banco", "Banco de arena", "Banka", "Bank", "Bankje", "Bankjegykiadó automata", "Bankomat", "Banku", "Banque", "Bảo hiểm", "Bảo tàng", "Bảo tàng", "Bảo tồn", "Bara", "Bar",
		"Bar", "Barazki-saltzaile", "Barinn", "Barkácsbolt", "Barlangbejárat", "Barrage", "Basenk", "Basin", "Baso", "Baso", "Bassin", "Bâtiment", "Bâtiment hospitalier", "Bâtiment industriel", "Bâtiment public",
		"Battlefield", "Baumarkt", "Baum", "Baustelle", "Bay", "Beach", "Beach Resort", "Beauty Shop", "Bed and Breakfast", "Beek", "Begraafplaats", "Begraafplaats", "Běhanišćo", "Behatoki", "Bejaardenhuis",
		"Bench", "Bệnh viện", "Benne à ordures", "Bể nước", "Berghütte", "Berghut", "Bergkam", "Berg", "Běrow", "Běrowowe twarjenje", "Beschutting", "Bestattungsunternehmen", "Beverages Shop", "Biblioteca", "Bibliotheek",
		"Bibliothèque", "Bicycle Shop", "Bidaia-agentzia", "Biển", "Bigarren mailako errepide", "Bigarren mailako errepide", "Bijouterie", "Bijzonder uitzicht", "Bílabúðin", "Bílaþvottastöðin", "Bioscoop", "Biowobchod", "Birziklatze gune", "Bitwišćo", "Bizileku",
		"Bjezgmejnska kónčina", "Bjezgrotowy internetny přistup", "Blanchisserie", "Bloemist", "Blómabúðin", "Błoto", "Błóto", "Blumenladen", "Boatyard", "Bờ biển", "Bocna droga", "Boekenwinkel", "Boerderij", "Boerderij", "Boerenerf",
		"Boerenwinkel", "Bois", "Boîte de nuit", "Boîte postale", "Bókabúðin", "Bókasafnið", "Bom", "Book Shop", "Boom", "Bordeel", "Bordel", "Bordell", "Borgin", "Borne kilométrique", "Borne kilométrique",
		"Börtön", "Bos", "Bos", "Bosque", "Bouche de métro", "Boucher", "Boue", "Boulangerie", "Boundary Stone", "Boutique d'art", "Boutique de cadeaux", "Boži dom", "Bóžy dom", "Braakliggend terrein", "Brandkraan",
		"Brandstof", "Brandweer", "Brezal", "Bricolage", "Bridleway", "Brievenbus", "Brod", "Bród", "Bron", "Bron", "Brothel", "Broussailles", "Brownfield Land", "Brunahaninn", "Brunnen",
		"Bruyère", "Bücherei", "Buchgeschäft", "Bucht", "Building Block", "Building Entrance", "Building", "Buitensportwinkel", "Buitenwijk", "Bulego", "Bundesland/-staat", "Bunker", "Burdel", "Bureau", "Bureau de change",
		"Bureau de Change", "Büro", "Bürogebäude", "Busbahnhof", "Bushalte", "Bushalte", "Bushaltestelle", "Busowe dwórnišćo", "Busowe zastanišćo", "Bus Station", "Bus Stop", "Buszállomás", "Buszmegálló", "Butcher", "Bútor",
		"Bưu điện", "Buzón de correos", "Bydlenja", "Bydleńska droga", "Bydlenska hasa", "Bydlenske twarjenje", "Bydlenski blok", "Bydlenski blok", "Bydlenski wobwod", "Byway", "Bźezgmejnske strony", "Cabaña alpina", "Cabin", "Cabo", "Cadeauwinkel",
		"Cafe", "Café", "Café", "Cajero automático", "Cama y desayuno (B&B)", "Camino", "Camino prioritario para peatones y caballos", "Campamento", "Campingowanišćo", "Campingowanišćo za caravany", "Camping para caravanas", "Campingplatz", "Campo de batalla", "Campo de golf", "Camp Site",
		"Canal de délaissement", "Canal guiado de autobuses", "Canal", "Canal", "Cancha deportiva", "Cảnh sát", "Cape", "Capilla", "Cap", "CAP", "Característica", "Caravankampeerterrein", "Caravan Site", "Carburant", "Car Dealer",
		"Carnicería", "Car Parts", "Carpet Shop", "Car Rental", "Car Repair", "Carretera nacional", "Carretera primaria", "Carretera principal", "Carretera secundaria", "Carretera secundaria", "Carretera terciaria", "Carsharing", "Car Sharing", "Car Shop", "Car Wash",
		"Casa", "Casa de cambio", "Casa", "Casas", "Cascada", "Cascade", "Caserne des pompiers", "Casino", "Casinò", "Cassetta delle lettere", "Castello", "Castillo", "Castle", "Cầu thang", "Cave Entrance",
		"Cây", "Cây xăng", "Cementerio", "Cementerio", "Cemetery", "Centrala za sobujěducych", "Centrala za sobujězdźenje", "Centre commercial", "Centre communautaire", "Centre d'arts", "Centre de jardinage", "Centre de santé", "Centre pour la jeunesse", "Centre sportif", "Centro artístico",
		"Centro comercial", "Centro comercial", "Centro comunitario", "Centro deportivo", "Centro de salud", "Centro juvenil", "Centrum za młodostnych", "Cesto de basura", "Chalet", "Champ de bataille", "Channel", "Chapel", "Charity Shop", "Chata", "Château",
		"Chemin de fer à voie étroite", "Chemin", "Chemin piéton", "Chemin piéton", "Chemist", "Chenal", "Chěžka", "Chiến trường", "Chiesa", "Chiesa", "Chimiste", "Chirurgie vétérinaire", "Chợ", "Chỗ Đậu xe", "Chỗ Đậu Xe buýt",
		"Chỗ Đậu Xe đạp", "Chódnik", "Chódnik", "Chỗ Mướn Xe", "Chỗ Mướn Xe đạp", "Chợ phiên", "Chợ phiên", "Chorownja", "Chorownja", "Chợ", "Church", "Church", "Chute d'eau", "Chyža", "Cimetière",
		"Cimetière", "Cimitero", "Cine", "Cinema", "Cinéma", "Circuit", "Čisćernja", "City Hall", "City", "Ciudad", "Cliff", "Clínica", "Clinic", "Clínica veterinaria", "Clinique",
		"Clothes Shop", "Club", "Club nocturno", "Club social", "Coastline", "Code postal", "Código postal", "Coiffeur", "Cỏ", "Colina", "College", "Collège", "Colline", "Combustible", "Comida rápida",
		"Commerce", "Commercial Area", "Commercial Building", "Commercieel gebied", "Commercieel gebouw", "Common Land", "Community Centre", "Complejo en la playa", "Compras", "Computergeschäft", "Computer Shop", "Computerwinkel", "Concesionario de automóviles", "Concessionaria", "Condado",
		"Confectionery Shop", "Confiserie", "Cổng", "Công trường Xây dựng", "Công viên", "Công viên", "Công viên", "Conservation", "Construction", "Convenience Store", "Coo", "Coowobchod", "Copyshop", "Copy Shop", "Cosmeticawinkel",
		"Cosmetics Shop", "Costa", "Country", "County", "Courthouse", "Cratère", "Crater", "Cráter", "Crematorio", "Crematorium", "Crématorium", "Crème glacée", "Cresta", "Crête", "Cruce de autovías",
		"Cửa hàng Xe hơi", "Cửa hàng Xe mô tô", "Cửa vào", "Cycle Parking", "Cycle Path", "Cycle Rental", "Cyrkej", "Cyrkej", "Đài Kỷ niệm", "Dalokodróha", "Dalokodróha", "Dalokowobchadowa droga", "Dalokowobchadowa droga", "Dalokowobchadowa droga se twari", "Dalurinn",
		"Dalurinn", "Đầm lầy", "Dam", "Đảo", "Đảo", "Đất", "Debjenkowy wobchod", "Deelgebied", "Denda", "Denda", "Đền thánh Dọc đường", "Dentista", "Dentist", "Dentiste", "Department Store",
		"Derelict Canal", "Desagüe", "Détroit", "Địa phương", "Điện thoại Công cộng", "Điện thoại Khẩn cấp", "Dierenarts", "Dierentuin", "Dierenwinkel", "Digue", "Đỉnh", "Discount Items Shop", "Discountwinkel", "Diskoteka", "Distance Marker",
		"Distributeur automatique", "Distributeur automatique de billets", "Distributore automatico", "District", "District", "Disused Railway", "Disused Railway Station", "Ditch", "Dobroćelski wobchod", "Dock", "Docteurs", "Doctores", "Doctors", "Doe-het-zelf-winkel", "Đồi",
		"Do-It-Yourself", "Dokter", "Dok", "Doł", "Doł", "Domb", "Dom", "Dom", "Dom", "Domy", "Đồng cỏ", "Dòng suối", "Dorf", "Dormitorio", "Dormitorio",
		"Dormitory", "Dormitory", "Dorp", "Dorre", "Dorre", "Dortoir", "Dortoir", "Drain", "Drastowy wobchod", "Drastowy wobchod", "Drinking Water", "Drinkwater", "Driving School", "Droga drugego rěda", "Droga drugego rěda",
		"Droga", "Droga prědnego rěda", "Droga prědnego rěda", "Droga tśeśego rěda", "Droga z pómjeńšonym wobchadom", "Drogerija", "Dróha druheho rjada", "Dróha druheho rjada", "Dróha", "Dróha prěnjeho rjada", "Dróha prěnjeho rjada", "Dróha so twari", "Dróha třećeho rjada", "Dróha za přidróžnych", "Drožka za pěskowarjow",
		"Drugstore", "Dry Cleaning", "Dulcería", "Đường bộ", "Đường bộ Lớn", "Đường Cao tốc", "Đường Chính", "Đường Chính", "Đường Cưỡi ngựa", "Đường Đang Xây", "Đường đua", "Đường", "Đường Không Lát", "Đường Lớn", "Đường mòn",
		"Đường Một Ray", "Đường Nhỏ", "Đường phụ", "Đường sắt Đang Xây", "Đường sắt", "Đường sắt Leo núi", "Đường Trượt tuyết", "Đường Xe đạp", "Dwórnišćo", "Dwórnišćo", "Dypk", "Dýragarðurinn", "Dźiwadło", "Eau", "Eau potable",
		"Éboulis", "Échalier", "Écluse", "École", "École de conduite", "Edificio comercial", "Edificio de oficinas", "Edificio escolar", "Edificio", "Edificio hospitalario", "Edificio industrial", "Edificio pubblico", "Edificio público", "Edificio público", "Edificio universitario",
		"Eenkamerappartement", "Église", "Église", "Egyetem", "Egyetemi épület", "Ehemaliger Bahnhof", "Eilandje", "Eiland", "Eiland", "Einkaufszentrum", "Einkaufszentrum", "Eisdiele", "Eisenbahn im Bau", "Eisenbahn", "Eisenwarenhändler",
		"Eldfjallið", "Electronics Shop", "Elektronicawinkel", "Elektronikgeschäft", "Eliza", "Eliza", "Embajada", "Embalse", "Embassy", "Emergency Access Point", "Emergency Phone", "Enbaxada", "Enfermería", "Enparantza", "Entrada a cueva",
		"Entrée de grotte", "Eo biển", "Épicerie", "Építés alatt álló autópálya", "Épületbejárat", "Eraikina", "Eraikin publiko", "Eraikin publiko", "Erhebung", "Erosketak", "Errauste labe", "Errepide", "Errepide nagusi", "Escalera para atravesar verjas", "Escalones",
		"Esclusa", "Escuela", "Eskailera-mailak", "Eskolaurre", "Eskualde", "Espetxe", "Estación de autobuses", "Estación de bomberos", "Estación de metro", "Estación de tren", "Estadio", "Estadio", "Estado o provincia", "Estate Agent", "Estrecho",
		"Estudio", "État", "Etenswarenwinkel", "Etxeak", "Etxe", "Etxe", "Eyjan", "Faculteitsgebouw", "Faculty Building", "Fahrradgeschäft", "Fahrrad-Stellplatz", "Fahrschule", "Fakultowe twarjenje", "Falaise", "Falu",
		"Fa", "Fangelsið", "Farmacia", "Farmacia", "Farma", "Farma", "Farmazia", "Farmazia", "Farm Building", "Farmland", "Farm", "Farm", "Farm Shop", "Farmyard", "Farsímaverslunin",
		"Fashion Shop", "Fast food", "Fast Food", "Fatabúðin", "Feature", "Feldweg", "Fellið", "Fell", "Ferðaskrifstofan", "Fermata autobus", "Ferme", "Ferme", "Ferretería", "Ferry terminal", "Ferry Terminal",
		"Feuerwehr", "Fietsenstalling", "Fietsenwinkel", "Fietspad", "Fietsverhuur", "Fioraio", "Fiordo", "Fire Hydrant", "Fire Station", "Fischereigrund", "Fishing Area", "Fish Shop", "Fiskbúðin", "Fitnesowy center/Fitnesowe studijo", "Fitness Centre / Gym",
		"Fitnesscentrum", "Fitness /gymnastique", "Fitness-Zentrum", "Fjallið eða tindurinn", "Fjeld", "Fjell", "Fjel", "Fjord", "Fjörðurinn", "Flats", "Fleuriste", "Floristería", "Florist", "Flughafen", "Flughafen",
		"Flugvöllurinn", "Flugvöllurinn", "Fluss", "Fluss", "Fogorvos", "Folyó", "Fonction", "Fontaine", "Fontein", "Food Shop", "Footpath", "Ford", "Forest", "Forêt", "Forêt",
		"Forrás", "Fossé", "Fossinn", "Fotograf", "Fotowinkel", "Fountain", "Friedhof", "Friedhof", "Frisörsalon", "Frizerski salon", "Frontera administrativa", "Fruttivendolo", "Fruttivendolo", "Fuel", "Fuente",
		"Fuente mineral", "Funeral Directors", "Funicular Railway", "Funkcija", "Furniture", "Furt", "Fußweg", "Gæludýrabúðin", "Gailur", "Galería", "Galerie marchande", "Galerie", "Galerija", "Gallery", "Ga ra",
		"Garage", "Garaje", "Garaža", "Garázs", "Garden Centre", "Garden", "Gastenverblijf", "Gate", "Gau-klub", "Gaztelu", "Gebouw", "Gecultiveerd areaal", "Gedenkstätte", "Gefängnis", "Gehöft",
		"Gehucht", "Geiser", "Géiser", "Gejzír", "Gelateria", "Geldautomaat", "Geldautomat", "Gelijkvloerse kruising", "Gemakswinkel", "Gemeenschapscentrum", "Gemeentehuid", "Gemeentehuis", "Gemeentehuis", "Gemeente", "Gemeentevrij gebied",
		"General Store", "Gereedschappenwinkel", "Geschäft", "Geschäft", "Geschenkeladen", "Getränkemarkt", "Gevangenis", "Geyser", "Geysir", "Gezondheidscentrum", "Ghế", "Ghiacciaio", "Gift Shop", "Gígurinn", "Gimnasio",
		"Gioielleria", "Gipfel", "Gîte", "Gjafabúðin", "Glaciar", "Glacier", "Glaziar", "Gleccser", "Gletscher", "Gletsjer", "Gmejna", "Gmejnski centrum", "Gmejnski kraj", "Golfbaan", "Golf Course",
		"Golf miniature", "Golfowišćo", "Golfownišćo", "Golfplatz", "Golf-zelai", "Góntwarske sedło", "Górka", "Górski chromcyk", "Górski grjebjeń", "Gósćeńc", "Gósćeńc pśi awtodroze", "Goshverinn", "Góstny dom", "Gozotegi", "Grada",
		"Grajkanišćo", "Grand magasin", "Granja", "Granja", "Gras", "Grass", "Grave Yard", "Greenfield Land", "Greengrocer", "Grenspaal", "Grocery Shop", "Groenteboer", "Groentenwinkel", "Grotingang", "Gué",
		"Guest House", "Gufubaðið", "Guided Bus Lane", "Gyalogút", "Gyógyszertár", "Gyorsétterem", "Hæðin", "Hafið", "Hairdresser", "Hala", "Hal", "Halbolt", "Hal", "Hall", "Hall",
		"Haltepunkt", "Hameau", "Hamlet", "Hàng xóm", "Haran", "Haran", "Harategi", "Hardware Store", "Harrobi", "Hasa z pomjeńšenym wobchadom", "Haurtzaindegi", "Haus", "Haut-fond", "Házak", "Ház",
		"Health Centre", "Heath", "Heide", "Helados", "Helling", "Hellisop", "Herbe", "Herdenkingsmonument", "Herrialdea", "Herria", "Herrixka", "Herrixka", "Hersvæðið", "Heuvel", "Hidrante",
		"Hi-fi", "Hi-Fi", "Highway under Construction", "Hilerri", "Hilerri", "Hill", "Hiria", "Hirugarren mailako errepide", "Historic Railway Station", "Historisches Gebäude", "Historiske dwórnišćo", "Hjólabúðin", "Hladarnja", "Hljómtækjabúðin", "Hochschule",
		"Hochstand", "Hồ Đánh cá", "Höhleneingang", "Hola", "Hòm thư", "Hondar-banku", "Hondartza", "Hôpital", "Hora", "Horinski hrjebjeń", "Hórka", "Hórska bawda", "Hórska wuchowanska słužba", "Hosćenc", "Hospital",
		"Hospital Building", "Hospodarske twarjenje", "Hospoda", "Hostel", "Hóstny dom", "Hotel", "Hotel", "Hôtel de ville", "Hótelið", "Hótelið", "Hotel", "House", "House", "House", "Houses",
		"Hout", "Hraðbankinn", "Hrajkanišćo", "Hrjebja", "Hród", "Huis", "Huis", "Huis", "Huizen", "Hunting Stand", "Húsgagnaverslunin", "Húsið", "Hutte", "Hut", "Hverfið",
		"Hydrant", "Ibai", "Ibilgailu-alokairu", "Ice Cream", "Ice Rink", "Icon", "Icoon", "Igerilekua", "Iglesia", "Iglesia", "IJs", "IJsbaan", "Ikona", "Île", "Île",
		"Îlot", "Ilustración", "In aanbouw", "Indicador kilométrico", "Industrial Area", "Industrial Building", "Industrieel gebied", "Industrieel gebouw", "Industriegebiet", "Industrijowa kónčina", "Industrijowe lado", "Industrijowe twarjenje", "Informacija", "Informacije", "Información",
		"Informatie", "Informations", "Information", "Informazioa", "Ingang", "Inmobiliaria", "Insel", "Insel", "Insurance", "Ipari épület", "Irla", "Irla", "Iroda", "Iskola", "Iskolaépület",
		"Isla", "Island", "Island", "Isla", "Isleta", "Islet", "Isola", "Isola", "Itsasertz", "Itsasoa", "Ivóvíz", "Izotz-pista", "Izozkiak", "Íþróttamiðstöðin", "Jachthaven",
		"Jachtowy přistaw", "Jachtowy pśistaw", "Jachttoren", "Jamowy zachod", "Janaridenda", "Jardín de infancia", "Jardin d'enfant", "Jardin", "Jardín", "Jastwo", "Játékbolt", "Jatetxe", "Jěchanski puć", "Jednokolijowa železnica", "Jědźny lód",
		"Jégkrém", "Jeugdcentrum", "Jeugdherberg", "Jewelry Shop", "Jězbna šula", "Jězdna kólej kólejowego busa", "Jězdna šula", "Jökullinn", "Jolastoki", "Jonction d'autoroute", "Jonction ferroviaire", "Joyería", "Jugendhaus", "Jugendherberge", "Juguetería",
		"Juwelier", "Juzgado", "Kaap", "Kabelspoorweg", "Kafejownja", "Kafetegi", "Kaffihúsið", "Kamjenišćo", "Kampeerterrein", "Kanaal", "Kanaal", "Kanal", "Kanal", "Kanpin", "Kantoor",
		"Kantoorartikelenwinkel", "Kantoorgebouw", "Kapałka", "Kapel", "Kapellan", "Kapelle", "Kapera", "Kap", "Kapper", "Kasino", "Kastalinn", "Kasteel", "Kaszinó", "Kaufhaus", "Kávézó",
		"Kazino", "Kênh", "Kěrchow", "Kěrchow", "Kerékpárkölcsönző", "Kerékpárüzlet", "Kereskedelmi épület", "Kerk", "Kerk", "Kerki", "Kert", "Khách sạn", "Khách sạn", "Khách sạn", "Khu Bảo tồn Thiên niên",
		"Khu vực Buôn bán", "Khu vực Công nghiệp", "Khu vực Khảo cổ", "Khu vực Nhà ở", "Khu vực Quân sự", "Khu vực Thương mại", "Khu Vườn Gia đình", "Kilometernik", "Kilometrownik", "Kindergarten", "Kino", "Kiosk nowin", "Kiosko", "Kiosk", "Kiosk Shop",
		"Kioskwinkel", "Kiosque", "Kirche", "Kirche", "Kirkjan", "Kiroldegi", "Kirol denda", "Kirol-portu", "Kjarchob", "Kjarcma", "Kledingwinkel", "Kledingwinkel", "Kleuterschool", "Klif", "Kliniek",
		"Klinika", "Klub", "Kneipe", "Kniharnja", "Knihownja", "Knježi dwór", "Kofejownja", "Kolesowarska šćežka", "Kólnja", "Kompjuterowy wobchod", "Komunak", "Konderria", "Konditarnja", "Könyvesbolt", "Könyvtár",
		"Kopěrowanski wobchod", "Korčma", "Kórház", "Kórházépület", "Kosmetikowy salon", "Kosmetikowy wobchod", "Kraj", "Kraj", "Krankenhaus", "Krankenhaus", "Krater", "Krematorij", "Krematorium", "Krě", "Kruis langs de weg",
		"Kśica awtodrogi", "Kulturny centrum", "Kunstcollectief", "Kunst", "Kunstwerk", "Kunstwinkel", "Kupa", "Kupa", "Kupka", "Kupnica", "Kustlijn", "Kwětkarnja", "Ký túc xá", "Ký túc xá", "Lækurinn",
		"Łakańca", "Lakások", "Landfill", "Landgoed", "Landið", "Land", "Land", "Làng", "Larre", "Lâu đài", "Laundry", "Lavage de voiture", "Lavanderia", "Lavandería", "Lavasecco",
		"Ławka", "Lean To", "Leikfangaverslunin", "Leikhúsið", "Lěkarjo", "Lěkarnja", "Lěkarnja", "Lépcső", "Lěs", "Lěs", "Lětanišćo", "Lětanišćo", "Level Crossing", "Librairie", "Library",
		"Libreria", "Librería", "Liburudenda", "Liburutegia", "Licorería", "Licorería", "Lieu de culte", "Lieu de vacances à la plage", "Lieu non organisé", "Lightrail", "Light Rail", "Limite administrative", "Limpieza en seco", "Linea di costa", "Listaverkið",
		"Listowy kašćik", "Littoral", "Living Street", "Localidad", "Localité", "Locality", "Location de vélos", "Location de voiture", "Lock Gate", "Lock", "Lod", "Lodojc", "Lodo", "Lodowa hala", "Lodowc",
		"Łódźnica", "Lohi", "Lokalitate", "Loradenda", "Lorategi", "Łoźowa suwanka", "Luchthaven", "Luchthaven", "Łučina", "Łučina", "Łučiny", "Ługowe łuki", "Ługowe łuki", "Łuka", "Luogo di culto",
		"Lurmutur", "Lưu vực", "Mã Bưu điện", "Macellaio", "Magasin", "Magasin", "Magasin d'alimentation biologique", "Magasin d'alimentation", "Magasin d'animaux", "Magasin de beauté", "Magasin de boissons", "Magasin de charité", "Magasin de chaussures", "Magasin de cosmétiques", "Magasin de jouets",
		"Magasin d'électronique", "Magasin de matériel informatique", "Magasin de mode", "Magasin de moto", "Magasin de musique", "Magasin de photocopie", "Magasin de photos", "Magasin de produits agricoles", "Magasin de sport", "Magasin de tapis", "Magasin de téléphones mobiles", "Magasin de vélos", "Magasin de vêtement", "Magasin de vidéos", "Magasin de voitures",
		"Magasin d'habillement", "Magasin discount", "Magasin en plein air", "Magasin généraliste", "Magasin Hi-Fi", "Magasin informatique", "Mairie", "Maison de retraite", "Maison de santé", "Maison d'hôte", "Maison", "Maison", "Maisons", "Makelaar", "Makler z imobilijemi",
		"Mała kupa", "Mall", "Małozahrodki", "Manantial", "Manoir", "Manor", "Máquina expendedora", "Marchand de biens", "Marchand de fruits et légumes", "Marchand de journaux", "Marché", "Marché public", "Marches", "Marché", "Marécage",
		"Mare", "Marina", "Marisma", "Market", "Marketplace", "Market", "Markt", "Marktplein", "Markt", "Mar", "Marša", "Marsh", "Matbúðin", "Matorrales", "Maure",
		"Maure", "Máy Rút tiền Tự động", "Meadow", "Meategi", "Meategi", "Meble", "Meent", "Měłkosć", "Memorial", "Mémorial", "Mendi", "Měnjernja", "Mercado", "Mercado", "Mercado público",
		"Mercado", "Merkataritza-gunea", "Merkatu", "Merkatu", "Mer", "Měšćanska železnica", "Městno", "Město", "Metro geltoki", "Metroingang", "Metrostation", "Metrowa stacija", "Metzgerei", "Meulbelzaak", "Měznik",
		"Middelbare school", "Midgetgolf", "Miền", "Mijn", "Mijn", "Militärgebiet", "Military Area", "Miltair gebied", "Mina", "Mina", "Mine", "Mine", "Mineralne žórło", "Mineralquelle", "Mineral Spring",
		"Miniature Golf", "Minigolf", "Miniwiki", "Minor Road", "Mirador", "Młodownja", "Młoźinski centrum", "Möbelgeschäft", "Mobiele telefoons", "Mobile Phone Shop", "Mobiliario", "Mốc Biên giới", "Mỏ Đá", "Modder", "Modegeschäft",
		"Modowy wobchod", "Moeras", "Moeras", "Moeras", "Moeras", "Mỏ", "Mỏ", "Monoment", "Monorail", "Montagne", "Montaña", "Monte", "Monument", "Monumento", "Monumentu",
		"Mooring", "Moor", "Moor", "Morjo", "Mórjo", "Mórska wuscyna", "Mórska wužina", "Mórske kupjele", "Mosoda", "Motel", "Motorcycle Shop", "Motorfietsenwinkel", "Motorradgeschäft", "Motorway", "Motorway Junction",
		"Motorway Road", "Motorway Services", "Mouillage", "Mountain", "Mountain Rescue", "Mozi", "Mud", "Muelle", "Mũi đất", "Mülleimer", "Municipalité", "Municipality", "Municipio", "Municipio", "Musée",
		"Musée", "Museoa", "Museo", "Museo", "Museum", "Museum", "Music Shop", "Muzej", "Muzejowa železnica", "Muzej", "Muzeum", "Múzeum", "Muziekwinkel", "Myjernja", "Nachtclub",
		"Nagykövetség", "Nakup", "Nakupowanišćo", "Nakupowanišćo", "Naměsto", "Napojowe wiki", "Narrow Gauge Railway", "Nasyp", "Natura-erreserba", "Nature Reserve", "Nature Reserve", "Naturschutzgebiet", "Naturschutzgebiet", "Natuurreservaat", "Natuurreservaat",
		"Nawjes", "Nettoyage à sec", "Newsagent", "Ngân hàng", "Ngã tư Đường Cao tốc", "Nghĩa địa", "Nghĩa địa", "Ngoại ô", "Nhà ga", "Nhà hàng", "Nhà hàng Ăn nhanh", "Nhà hát", "Nhà ở", "Nhà ở", "Nhà ở",
		"Nha sĩ", "Nhà Tắm hơi", "Nhà thờ", "Nhà thờ", "Nhà thuốc", "Nhà thuốc", "Nhà thuốc", "Nhà trẻ", "Nhà trường", "Nhà tù", "Night Club", "Niłčina, pěsčišćo", "Njewobtwarjena zemja", "Njewobtwarźona droga",
		"Njewobtwjerdźena dróha", "Njezarědowana droga", "Njezarjadowana dróha", "Nócny klub", "Nơi Đổ Rác", "Nơi Du lịch", "Nơi Thờ phụng", "Noleggio biciclette", "Noodtelefoon", "Notrufsäule", "Núi", "Núi lửa", "Nước", "Nurserie", "Nursery",
		"Nursing Home", "Nuzniki", "Nuzowa słužba", "Nuzowy telefon", "Nyilvános épület", "Office", "Office Building", "Office de poste", "Off License", "Off License", "Oficina", "Oficina de correos", "Oftalmólogo", "Ohe eta gosari (B&B)", "Oinezkoen bide",
		"Okindegi", "Onbeheerd kanaal", "Ongebruikte spoorweg", "Ongebruikt spoorwegstation", "Ongeclassificeerde weg", "Onverharde weg", "Onverharde weg", "Openbaar gebouw", "Openbaar gebouw", "Openbare markt", "Openbare telefoon", "Open schutplaats", "Optician", "Opticien", "Optikar",
		"Optiker", "Organic Food Shop", "Organische winkel", "Ospedale", "Ospitalea", "Ostatu", "Ostello", "Ottico", "Outdoor Shop", "Overdekt winkelcentrum", "Overstap", "Pad", "Pad", "Pad", "Pad",
		"País", "Palais de justice", "Panadería", "Panetteria", "Pantano", "Pantano", "Papeterie", "Papjernistwo", "Parada de autobuses", "Parafarmacia", "Paralelna droga", "Parallelspoorweg", "Parallelweg", "Parc", "Parc aquatique",
		"Parc à thème", "Parcheggio", "Parcheggio per biciclette", "Parc", "Parc", "Park", "Parkea", "Parke", "Parke", "Parkeren", "Parke tematiko", "Parking", "Parking à vélos", "Park", "Park",
		"Parkowanišćo", "Parkplatz", "Park zabawy", "Parque acuático", "Parque", "Parque", "Parque temático", "Partage de voiture", "Paslerska potrjeba", "Paso a nivel", "Passage à niveau", "Path", "Patinoire", "Pays", "Pays",
		"Peak", "Pecio", "Pedestrian Way", "Pedregal", "Peluquería", "Pension", "Pente douce", "Périphérie", "Pěstowarnja", "Pěstowarnja", "Pet Shop", "Peuterspeelzaal", "Peuterspeelzaal of kleuterschool", "Pharmacie", "Pharmacie",
		"Pharmacy", "Photo Shop", "Picknickplaats", "Pic", "Picnic Site", "Pico", "Pièces d'automobile", "Piknik-gune", "Piknikowanišćo", "Piscina", "Piscine", "Pista de carreras", "Pista de patinaje sobre hielo", "Pista", "Pista",
		"Pista", "Piste cyclable", "Piste", "Piste", "Piste", "Piste", "Pitna woda", "Pitna wóda", "Pjekarnja", "Plaats", "Place de marché", "Place of Worship", "Plage", "Plateforme ferroviaire", "Plateforme",
		"Platforma", "Platform", "Playa", "Playground", "Plaza", "Plein", "Płótne stupadło", "Płotowy pśestup", "Pöbbinn", "Pobrjóžna linija", "Pochowanski wustaw", "Podkopki", "Podkopki", "Pódlańska droga", "Pódlanska hasa",
		"Pódlanski puć", "Podstup", "Pódstup", "Point d'accès d'urgence", "Point de recyclage", "Point de vue", "Pointe", "Point", "Poissonnerie", "Pola", "Police", "Policía", "Policija", "Politie", "Polizia",
		"Pólna drožka", "Pólny puć", "Pomnik", "Pompes funèbres", "Porte d'écluse", "Porte", "Posta", "Posta-kode", "Postaláda", "Post", "Post Box", "Postcode", "Postetxe", "Postkantoor", "Póstkassinn",
		"Postleitzahl", "Post Office", "Postowa licba", "Postowe wodźenske čisło", "Póstowy zarjad", "Powjaznica", "Pradera", "Předměsto", "Předšula", "Preescolar", "Přemysłowa kónčina", "Přenocowanje ze snědanju", "Přepław", "Presa", "Pre-School",
		"Préscolaire", "Preserved Railway", "Přestrjencowy wobchod", "Pretpark", "Přewozny přistaw", "Přibrjóh", "Prigione", "Přijězd na awtodróhu", "Přijimanski wobłuk", "Přijimarnja njezbožow", "Přijimarnja starowiznow", "Přikuski", "Primaire weg", "Primaire weg", "Primary Road",
		"Primary Road", "Přirodoškit", "Přirodoškitne pasmo", "Přirodoškitne pasmo", "Prisión", "Prison", "Přistawnišćo", "Priwatne twarjenje", "Přizamkowe kolije", "Promenada", "Prózdnjeński zachod", "Prozninski domcyk", "Prullenbak", "Pśedměsto", "Pśedšula",
		"Pśenocowanje ze snědanim", "Pśepóžycarnja kólasow", "Pśewózny pśistaw", "Pśibrjog", "Pśibrjozna linija", "Pśitwaŕ", "Pub", "Public Building", "Public Building", "Public Market", "Public Telephone", "Pućik", "Pućny křiž", "Pućowanski běrow", "Pueblo",
		"Puerta", "Puerto deportivo", "Puin", "Punt", "Punto de reciclaje", "Punto di accesso WiFi", "Punto", "Putetxe", "Quán Cà phê", "Quảng trường", "Quận hạt", "Quarry", "Quốc gia", "Racecircuit", "Raceway",
		"Radnica", "Radnica", "Radweg", "Raftækjaverslunin", "Railway Junction", "Railway", "Railway Platform", "Railway Points", "Railway Spur", "Railway Station", "Railway Station", "Railway under Construction", "Railway Yard", "Rangeerterrein", "Ranžěrowanske dwórnišćo",
		"Rapides", "Rápidos", "Rapids", "Rạp phim", "Rathaus", "Rathaus", "Reception Area", "Rechtbank", "Récif", "Rěčne prohi", "Rěčny brjóh", "Recreatiegebied", "Recreatiegebied", "Recreation Ground", "Recreation Ground",
		"Recycling Point", "Reddingsdienst", "Reef", "Refuge", "Refuge", "Refugio", "Region", "Région", "Región", "Regio", "Régió", "Reiðhjólaleigan", "Reisbureau", "Reisebüro", "Rejtarska drožka",
		"Rěka", "Rěka", "Rendőrség", "Rennstrecke", "Réparation de voitures", "Represa", "Repuestos automotrices", "Repülőtér", "Repülőtér", "Reserva natural", "Réserve naturelle", "Réserve naturelle", "Reservoir", "Réservoir", "Residencia de jubilados",
		"Residential Area", "Residential Building", "Residential", "Résidentiel", "Restaurant", "Restaurante", "Restauration rapide", "Retail Building", "Retail", "Retirement Home", "Rěznik", "Ribera", "Ridge", "Riff", "Rifið",
		"Rif", "Rifugio alpino", "Rijschool", "Río", "Río", "Ristorante", "Riverbank", "River", "River", "Rive", "Rivierbedding", "Rivière", "Rivière", "Rivier", "Rivier",
		"Road", "Roca", "Roche", "Rock", "Rotsen", "Route autoroutière", "Route de service", "Route", "Route mineure", "Route non classifiée", "Route non goudronnée", "Route principale", "Route principale", "Route principale", "Route principale",
		"Route secondaire", "Route secondaire", "Route secondaire", "Route tertiaire", "Rozglědanišćo", "Rozpadanki", "Rozpušćena železnica", "Rozwjaseleński park", "Rue résidentielle", "Ruinas", "Ruine", "Ruïne", "Ruins", "Ruiterpad", "Rừng",
		"Rừng", "Rừng Trồng Cây", "Running Track", "Ruta para bicicletas", "Rybnišćo", "Rybowy wobchod", "Safnið", "Salle", "Salle", "Salle communale", "Salmenta automatiko", "Salón", "Salon", "Sân băng", "Sân bay",
		"Sân bay", "Sân chơi", "Sân Golf", "Sân Trại", "Sân vận động", "Sân vận động", "Sauna", "Sawna", "Scala", "Sćažka", "Sćažka", "Sćažka za kólasowarjow", "Šćežka", "Šćežka", "Schadźowarnja",
		"Scheepswerf", "Schiffswrack", "Schleusentor", "Schodźenki", "Schoenenzaak", "School", "School Building", "Schoolgebouw", "Schoonheidssalon", "Schoonheidssalon", "Schrebergärten", "Schuhgeschäft", "Schule", "Schwimmbad", "Scree",
		"Scrub", "Sea", "Secondary Road", "Secondary Road", "Secours en montagne", "Secundaire weg", "Secundaire weg", "Sedlišćo", "Sendero", "Sendero", "Sendiráðið", "Service Road", "Services autoroutiers", "Shelter", "Shoal",
		"Shoe Shop", "Shop", "Shop", "Shopping", "Shopping Centre", "Siedlung", "Siêu thị", "Siêu thị", "Site archéologique", "Site de camping", "Site de caravane", "Site de pique-nique", "Sito archeologico", "Sjúkrahúsið", "Skała",
		"Skała", "Skalina", "Skótny gójc", "Skyndibitastaðurinn", "Slagboom", "Slagerij", "Slagveld", "Slátrarinn", "Slipway", "Sloot", "Sluisdeur", "Sluis", "Smáeyjan", "Smalspoor", "Smjećišćo",
		"Smykanišćo", "Snelweg in aanbouw", "Social Club", "Söluturninn", "Sòng bạc", "Sông băng", "Sông", "Speelgoedwinkel", "Speelplaats", "Spiaggia", "Špica", "Spielplatz", "Spielstraße", "Spielwarengeschäft", "Spits",
		"Spoogwegpunten", "Spoor in aanbouw", "Spoor", "Spoorwegkruising", "Spoorwegplatform", "Spoorwegstation", "Spoorwegstation", "Sportbolt", "Sportcentrum", "Sportgeschäft", "Sportnišćo", "Sportowy centrum", "Sportowy wobchod", "Sports Centre", "Sports Pitch",
		"Sports Shop", "Sportveld", "Sportwinkel", "Sportzentrum", "Spring", "Spušćadło", "Staat", "Stade", "Stadion", "Stadion", "Stadium", "Stadium", "Stad", "Stad", "Stadsgroen",
		"Stadsgroen", "Stadt", "Stadtteil", "Stand de caza", "Stand de tir", "Stand", "Stanowanišćo", "Starcownja", "Starownja", "State", "Stationery Shop", "Statok", "Staudamm", "Stazione di rifornimento", "Steengroeve",
		"Steps", "Stile", "Stołp", "Stomerij", "Štom", "Store", "Stortplaats", "Straatkiosk", "Strait", "Strand", "Straßenbahn-Haltestelle", "Straßenbahn", "Straßenbahn", "Stream", "Ströndin",
		"Strony šćitaneje pśirody", "Stroomversnelling", "Stroom", "Strowotny centrum", "Struikgewas", "Studentenhuis", "Studentenhuis", "Studentski internat", "Studentski internat", "Studijo", "Studio", "Studnja", "Stupy", "Stuwdam", "Subdibisio",
		"Subdivision", "Subdivisión", "Suburbio", "Suburb", "Subway Entrance", "Subway Station", "Sudnistwo", "Šula", "Šulske twarjenje", "Sumendi", "Sundlaugin", "Suối", "Supermarché", "Supermarché", "Supermark",
		"Supermarket", "Supermarket", "Supermarkt", "Supermarkt", "Supermercado", "Supermercado", "Supermercato", "Supermercato", "Supermerkatu", "Supermerkatu", "Superwiki", "Superwiki", "Sveitabærinn", "Swimmingpool", "Swimming Pool",
		"Sydlišćo", "Szálloda", "Szálloda", "Szálloda", "Szauna", "Szemétgyűjtő kosár", "Sziget", "Sziget", "Szikla", "Színház", "Szőnyegbolt", "Taberna", "Taksijowe zastanišćo", "Taller mecánico", "Tal",
		"Tal", "Tandarts", "Tankownja", "Tannlæknirinn", "Tàn tích", "Tapijtzaak", "Taxi", "Teatro", "Teléfono de emergencia", "Telefono pubblico", "Teléfono público", "Telefon za nuzowe zawołanje", "Telefonzelle", "Telekomunikaciski wobchod", "Téléphone d'urgence",
		"Téléphone public", "Templo", "Tenger", "Teppabúðin", "Teppichladen", "Terasa", "Terminal de ferry", "Terminal de ferrys", "Terrace", "Terrain contaminé", "Terrain de golf", "Terrain de jeux", "Terrain de sport", "Terrains communaux", "Terras",
		"Terre", "Terreno común", "Tertiaire weg", "Tertiary Road", "Textilreinigung", "Thánh Giá Dọc đường", "Thành phố", "Thánh tượng", "Tháp", "Tháp", "Theater", "Theatre", "Théâtre", "Theme Park", "Thị xã/trấn",
		"Thông tin", "Thung lũng", "Thung lũng", "Thùng rác", "Thư viện", "Tiệm", "Tiệm", "Tiệm Bánh", "Tiệm Báo", "Tiệm", "Tiệm", "Tiệm Cá", "Tiệm Đồ chơi", "Tiệm Giặt Quần áo", "Tiệm Giày",
		"Tiệm Hoa", "Tiệm Kem", "Tiệm Kẹo", "Tiệm Kính mắt", "Tiệm Làm tóc", "Tiệm Làm tóc", "Tiệm Máy tính", "Tiệm Nhạc", "Tiệm Phim", "Tiệm Quần áo", "Tiệm Rửa Hình", "Tiệm Rửa Xe", "Tiệm Sách", "Tiệm Sửa Xe", "Tiệm Tập hóa",
		"Tiệm Tạp phẩm", "Tiệm Thảm", "Tiệm Thời trang", "Tiệm Xe đạp", "Tienda", "Tienda benéfica", "Tienda", "Tienda de alfombras", "Tienda de alimentación", "Tienda de alimentación", "Tienda de artículos de arte", "Tienda de artículos de pesca", "Tienda de artículos deportivos", "Tienda de bicicletas", "Tienda de computación",
		"Tienda de mascotas", "Tienda de música", "Tienda de regalos", "Tienda de ropa", "Tienda de telefonía", "Tienda fotográfica", "Tienda por departamentos", "Tierarzt", "Tierra", "Tiểu học", "Tỉnh bang", "Tòa", "Tòa Đại sứ", "Toalety", "Tòa nhà",
		"Toilets", "Toiletten", "Toilettes", "Tölvubúðin", "Toren", "Toren", "Torhošćo", "Torre", "Torre", "Tour", "Tour", "Touristen-Information", "Towarišliwostny klub", "Towarstwo", "Tower",
		"Tower", "Town Hall", "Town", "Toy Shop", "Trabantowe město", "Track", "Trại", "Trại", "Trailerhelling", "Trail", "Train Stop", "Trại", "Trạm Cứu hỏa", "Tramhalte", "Trạm Phà",
		"Tramrails", "Tram Stop", "Tramwajka", "Tramwajkowe zastanišćo", "Tramway", "Trạm Xe điện Ngầm", "Tranbia geltoki", "Tranbia", "Trang viên", "Trap", "Travail artistique", "Travel Agency", "Trawa", "Tréð", "Tree",
		"Treinhalte", "Trenbide", "Treppe", "Tribunale", "Trolejbusowy milinowód", "Trung tâm Cộng đồng", "Trung tâm Nghệ thuật", "Trung tâm Thể thao", "Trung tâm Y tế", "Trunk Road", "Trunk Road", "Trường Cao đẳng", "Trường Đại học", "Trường học", "Trường Lái xe",
		"Trường Mầm non", "Truông", "Tuincentrum", "Tuin", "Turm", "Turm", "Tűzoltóság", "Twarjenje", "Twarjenjowy zachod", "Twar", "Twarske wiki", "Txalet", "U-Bahn-Station", "Udalerri", "Udaletxea",
		"Udaletxe", "Ufficio postale", "Uitvaartcentrum", "Unclassified Road", "Unibertsitate", "Unincorporated Area", "Universidad", "Universidad o instituto", "Università", "Universität", "Universitätsgebäude", "Université", "Universiteit", "Universiteitsgebouw", "University",
		"University Building", "Uniwersita", "Uniwersitne twarjenje", "Unsurfaced Road", "Ura", "Urtegi", "Úszómedence", "Utazási iroda", "Útivistarbúðin", "Üzemanyag", "Vách đá", "Vaðið", "Vado", "Vakantiehuisje", "Vallée",
		"Vallée", "Vallei", "Vallei", "Valle", "Valle", "Valley", "Valley", "Văn phòng", "Văn phòng Du lịch", "Városháza", "Város", "Város", "Vatnið", "Vatnsaflsvirkjunin", "Vatnsleikjagarðurinn",
		"Veen", "Veen", "Veerterminal", "Veitingastaðurinn", "Vendégpark", "Vendeur de voitures", "Vending Machine", "Vergnügungspark", "Verkfærabúðin", "Verkooppunt alcoholische dranken", "Verkooppunt alcoholische dranken", "Verpleeghuis", "Versicherungsbüro", "Verslunin", "Vervallen spoorweg",
		"Verwaltungsgrenze", "Verzekeringen", "Vệ sinh", "Veterinario", "Veterinary Surgery", "vía de ferrocarril", "Vía de servicio", "Vía de servicio", "Vía de tren abandonada", "Vía peatonal", "Videoleigan", "Video Shop", "Videotheek", "Videotienda", "Viewpoint",
		"Vignoble", "Village Green", "Village Hall", "Village", "Villamosmegálló", "Villa", "Ville", "Ville", "Vineyard", "Vịnh", "Visgrond", "Viswinkel", "Vivero", "Voetpad", "Voie de bus guidée",
		"Voie de funiculaire", "Voie ferrée abandonnée", "Voie ferrée désafectée", "Voie ferrée en construction", "Voie ferrée", "Vòi nước", "Vòi nước Máy", "Vòi Nước uống", "Volcan", "Volcán", "Volcano", "Völgy", "Volkstuinen", "Voorde", "Vrijliggende busbaan",
		"Vulcano", "Vulkaan", "Vulkan", "Vulkán", "Vườn", "Vườn Nho", "Vườn thú", "Wadi", "Walanki", "Wald", "Warenhuis", "Wäscherei", "Wasserfall", "Wasserij", "Waste Basket",
		"Waterbekken", "Waterfall", "Water", "Water Park", "Water Point", "Waterpunt", "Waterspeelpark", "Waterval", "Waterverbinding", "Waterway Connector", "Wayside Cross", "Wayside Shrine", "WC", "Wechselstube", "Weg",
		"Wehr", "Weide", "Weiler", "Weingut", "Weir", "Wentok", "Wetland", "Wetland", "Wetlands", "Wěža", "Wěža", "Widejowobchod", "Wiese", "WiFi Access", "WiFiアクセスポイント",
		"WiFi hozzáférés", "Wifi-toegang", "WiFi-зона", "Wijngaard", "Wiki", "Wiki", "Wikowanišćo", "Wikowar awtow", "Winicy", "Winkel", "Winkel", "Winkel", "Winkelcentrum", "Winkelen", "Winkelpand",
		"Winkels", "Wisselkantoor", "Wjaska", "Wjas", "Wjelike město", "Wjeska", "Wjes", "WLAN-Access-Point", "Wobcerk pśidostaśa", "Wobchod", "Wobchod", "Wobchod", "Wobchod črijow", "Wobchod na statoku", "Wobchodniske twarjenje",
		"Wobchod pod hołym njebjom", "Wobchody", "Wobchod za dary", "Wobchod za elektroniku", "Wobchod za hrajki", "Wobchod za hudźbniny", "Wobchod za kolesa", "Wobchod za měšane twory", "Wobchod za motorske", "Wobchod za spirituozy", "Wobchod za spirituozy", "Wobchod za tunje artikle", "Wobchod za zeleniny", "Wobchod za žiwidła", "Wočerstwjenišćo",
		"Wočerstwjenska krajina", "Wódne městno", "Wodopad", "Wodowy park", "Wódowy park", "Wódychańske strony", "Wódy", "Wodźizny", "Wohngebäude", "Wohnjostraža", "Wohnjowy hydrant", "Wohnwagen-Stellplatz", "Wojerska kónčina", "Wokrejs", "Wokrjes",
		"Woningen", "Wood", "Wood", "Woonerf", "Woonerf", "Woonwijk", "Wopomnišćo", "Wotpadkowe sudobjo", "Wotstajenišćo za kolesa", "Wrak", "Wreck", "Wrjosate strony", "Wrota", "Wrota přeplawnje", "Wuběgowanišćo",
		"Wuběgowánska cera", "Wuhibka", "Wuhladnišćo", "Wulkan", "Wulkoměsto", "Wulkopósłanstwo", "Wulkorěka", "Wuměłska twórba", "Wuměłski wobchod", "Wupožcowarnja za kolesa", "Wuskała", "Wuskokolijata železnica", "Wusoka šula", "Wuźišćo", "Wužitny lěs",
		"Wysoka šula", "Xa lộ", "Yachthafen", "Yacimiento arqueológico", "Youth Centre", "Zachod do podzemskeje železnicy", "Zagroda", "Zahnarzt", "Zahroda", "Zahrodny centrum", "Zajězd na awtodrogu", "Zalew", "Zaliw", "Zaměnjarnja", "Zandbank",
		"Zanjerodźeny kanal", "Zapatadenda", "Zapatería", "Zarjadniska hranica", "Zastajena železnica", "Zátony", "Zawěsćernja", "Zawrjene dwórnišćo", "Zběranišćo starowinow", "Zběranski basenk", "Zeeëngte", "Zee", "Železnica", "Železnica so twari", "Železniske křižnišćo",
		"Železniske nastupišćo", "Železniske zastanišćo", "Železniski přechod", "Zemja", "Zhromadny centrum", "Ziekenhuis", "Ziekenhuis", "Zinema", "Źiśownja", "Źiwadło", "Žiwidłowy wobchod", "Zjawne twarjenje", "Zjawne twarjenje", "Zjawne wiki", "Zjawny telefon",
		"Zmakanišćo za bydleńske wóze", "Zona industrial", "Zona militar", "Zone commerciale", "Zone de pèche", "Zone de réception", "Zone humide", "Zone humide", "Zone industrielle", "Zone militaire", "Zone résidentielle", "Zones humides", "Zoológico", "Zoologiko", "Zoo",
		"Žórło", "Žrědło", "Zubny lěkar", "Zugang zu einer U-Bahn-Station", "Zuhaitza", "Zwembad", "Zwěrjacy lěkar", "Zwězkowy kraj", "Zwisk mjez wódnymi pućemi", "Zwjazkowy kraj", "Žywnosć", "Þorpið", "Автобусна зупинка", "Автобусная остановка", "Автобусная станция",
		"Автовокзал", "Автозапчастини", "Автомагазин", "Автомагазин", "Автомагістраль", "Авто майстерня", "Автомастерская", "Автомийка", "Автомойка", "Автосалон", "Автостоянка", "Автошкола", "Агентство нерухомості", "Административная граница", "Адміністративний кордон",
		"Аеропорт", "Аеропорт", "Аквапарк", "Аквапарку", "алея", "Амбасада", "Аптека", "Аптека", "Аренда автомобилей", "Археологічні дослідження", "Аттракцион", "Аттракционы", "Аудитория", "Аудіо-техніка", "Аэропорт",
		"Аэропорт", "База відпочинку", "База відпочинку", "Бакалія", "Банк", "Банкомат", "Бар", "Басейн", "Бассейн", "Бассейн", "Башня", "Башня", "Башта", "Башта", "Береговая линия",
		"Берег ріки", "Библиотека", "Бібліотека", "Бігова доріжка", "Болота", "Болото", "Бордель", "Брод", "Броди", "Будинки для людей похилого віку", "Будинок", "Будинок", "Будинок престарілих", "Будівля", "Будівництво",
		"Будівництво автомагітсралі", "Будівництво колії", "Булочная", "Бункер", "Вай-Фай", "Велодорожка", "Веломагазин", "Велопарковка", "Велосипедна доріжка", "Верстовий камінь", "Верф", "Верфь", "Вершина горы", "Ветеринарная клиника", "Ветлікарня",
		"Взуття", "Винный магазин", "Вино", "Виноградник", "Вирубка", "Відео", "Військова зона", "В'їзд на автомагістраль", "Вода", "Водно-болотні угіддя", "Водно-болотні угіддя", "Водопад", "Водоспад", "Водосховище", "водохранилище",
		"Военная зона", "Ворота", "Вузькоколійка", "Вулкан", "Вхід в метро", "Вхід у будівлю", "Вход в метро", "Вход в пещеру", "Входу в печеру", "Высокогорная гостиница", "В'язниця", "Гавань для екскурсійних суден", "Газетний кіоск", "Гай", "Гай",
		"Галерея", "Гараж", "Гейзер", "Гірський хребет", "Гірські рятувальники", "Главная дорога", "Головна дорога", "Гора", "Гори", "Город", "Госпиталь", "Гостиница", "Гостиница", "Гостинница", "Гостьовий будинок",
		"Готель", "Готель", "Готель", "Громадська земля", "Громадський центр", "Грязь", "Грязюка", "Гуртожиток", "Гуртожиток", "Дамба", "Депо", "Деревня", "Дерево", "Детская игровая площадка", "Детский сад",
		"Джерело", "Дикий лес", "Дитячий майданчик", "Дитячий садок", "Дім", "Док", "Долина", "Долина", "Дом", "Дом", "Дом", "Дома", "Домик для гостей", "Дом искусств", "Дорога",
		"Дорога без класифікації", "Дорога без покриття", "Дорога для їзди верхи", "Дорога для пешеходов", "Дорога третьего класса", "Дошкільний заклад", "Дренажний канал", "Другорядна дорога", "Елемент", "Естественный лес", "Железная дорога", "Железнодорожная платформа", "Железнодорожная станция", "Железнодорожный переезд", "Жила вулиця",
		"Жилой район", "Житлова зона", "Житловий будинок", "Житловий квартал", "Житловий масив", "Забігайлівка", "Заброшеная ж/д ветка", "Заброшеная ж/д станция", "Законсервовані колії", "Зала", "Зала", "Залив", "Залізниця", "Залізнична гілка", "Залізнична платформа",
		"Залізнична станція", "Залізнична станція", "Залізничний переїзд", "За́мок", "Заповедник", "Заповідник", "Заповідник", "Заповідник", "Заправка", "Затока", "Звалище", "Здание", "Здание больницы", "Зелёная деревня", "Земля",
		"З’єднання водних шляхів", "З’єднання з автомагістраллю", "З’єднання з головною дорогою", "З’єднання з другорядною дорогою", "Знесення під забудову", "Зоомагазин", "Зоопарк", "Зроби сам", "Зупинка поїзда", "Икона", "Индекс", "Информация", "Іграшки", "Індекс", "Інформація",
		"Історична залізнична станція", "Кабіна", "Казино", "Канал", "Канал", "Канцтовари", "Каплиця", "Кар’єр", "Каток", "Кафе", "Квартал", "Квіти", "Килими", "Кинотеатр", "Кинуті колії",
		"Киоск", "Кіоск", "Кладбище", "Кладовище", "Клініка", "Клуб", "Книгарня", "Книжный магазин", "Ковзанка", "Ковры", "Коледж", "Колледж", "Комерційна нерухомість", "Компьютерный магазин", "Комп’ютерна крамниця",
		"Кондитерська", "Контейнер для сміття", "Конференц-зала", "Копальня", "Копальня", "Косметика", "Країна", "Кратер", "Крематоорий", "Крематорій", "Крепость", "Культова споруда", "Лавка", "Лагерь", "Ледник",
		"Лижня", "Ліжко та сніданок", "Лікарі", "Лікарня", "Лікарня", "Ліс", "Луг", "Лыжня", "Льодовик", "Магазин", "Магазин", "Магазин", "Магазин", "Магазин", "Магазин електроніки",
		"Магазин игрушек", "Магазин косметики", "Магазин подарков", "Магазин распродаж", "Маєток", "Майданчик для трейлерів", "Маленький остров", "Мебель", "Меблі", "Мемориал", "Меморіал", "Мерія", "Место для пикника", "Место поклонения", "Место швартовки",
		"Милиция", "Минеральный родник", "Минигольф", "Мис", "Мисливська вежа", "Мистецький центр", "Мілина", "Міліція (Поліція)", "Мінеральне джерело", "Міні-гольф", "Місто", "Місто", "Місце для пікніків", "Місце катастрофи", "Місце переробки відходів",
		"Місце стоянки для велосипедів", "Міськвиконком", "Мобильные телефоны", "Мобільні телефони", "Молодіжний центр", "Монорейка", "Монорельс", "Море", "Мороженное", "Морозиво", "Мотель", "Мотоцикли", "Музей", "Музей", "Музика",
		"Музыкальный магазин", "Муниципалитет", "Муніципалітет", "Мур", "Мусорка", "Мэрия", "Мясная лавка", "М’ясо", "Навіс", "Напої", "Населений пункт", "Неприєднанні території", "Нічний клуб", "ночной клуб", "Обмен валют",
		"Обмін валют", "Образотворче мистецтво", "обрыв", "Обслуживаемый лес", "Обувной магазин", "Общежитие", "общественное здание", "Овочі, фрукти", "Оглядовий майданчик", "Одяг", "Одяг", "Оздоровительный центр", "оптика", "Оптика",
		"Оселі", "Остов судна", "Острів", "Острів", "Острівець", "Остров", "Остров", "Осыпь камней", "Открытая площадка", "Открытый рынок", "Офис", "Офисная территория", "Офисное здание", "Офіс", "Офісний будинок",
		"охотничья вышка", "Очищена територія під забудову", "Паб", "Пагорб", "Палатка с едой", "Пальне", "Пам’ятник", "Памятник", "Парикмахерская", "Парк", "Парк", "Парк", "Паромная станция", "Передмістя", "Переїзд",
		"Перекрёсток", "Перешийок", "Перукар", "Питна вода", "Питьевая вода", "Підрозділ", "Пік", "Пішохідна доріжка", "Пішохідна дорога", "Платформа", "Плотина", "Пляж", "Пляжний курорт", "Подарунки", "Подъездная дорога",
		"Пожарная охрана", "Пожарный гидрант", "Пожежна станція", "Пожежний гідрант", "Покинута залізнична станція", "Покинута колія", "Покинутий канал", "Поле битви", "Поле боя", "Поле для гольфу", "Поликлиника", "Полупансион", "Пороги", "Поромна станція", "Посёлок",
		"Послуги копіювання", "Посольство", "Почтовое отделение", "Почтовый ящик", "Пошта", "Поштова скриня", "Пральня", "Прачечная", "Пригород", "Придорожній храм", "Придорожній хрест", "Придорожный сервис", "Прикордонний камінь", "Примыкающая дорога", "Продовольчі товари",
		"Продукты", "Произведения искусства", "Прокат авто", "Прокат автомобілів", "Прокат велосипедів", "Прокат велосипедов", "Промзона", "Промислова споруда", "Промышленное здание", "Пункт первой помощи", "Пункт швидкої допомоги", "Развалины", "Район", "Район риболовлі", "Раскопки",
		"Регион", "Резервуар", "Река", "Река", "Ремонт ж/д путей", "Ресторан", "Риба", "Ринкова площа", "Ринок", "Ринок", "Ритуальні послуги", "Риф", "Рів", "Ріка", "Ріка",
		"Родник", "Руїни", "Ручей", "Рыбалка", "Рыбный магазин", "Сад", "Сади-городи", "Садовый центр", "Сад та город", "Сады-огороды", "Салон", "Салон краси", "Сауна", "Сделай-Сам", "Село",
		"Сільпо", "Сільська галявина", "Скала", "Скеля", "Скеля", "Склад", "Слияние рек", "Службова дорога", "Смотровая площадка", "Соціальний магазин", "Спортивная дорожка", "Спортивний центр", "Спортивні товари", "Спортивный магазин", "Спортивный центр",
		"Спортмайданчик", "Спритні напої", "Ставок", "Стадион", "Стадион", "Стадіон", "Стадіон", "Станция ж/д", "Станция метро", "Станція метро", "Стежка", "Стежка", "Степ", "Стоматология", "Стоматологія",
		"Сточная канава", "Стоянка", "Страна", "Страхування", "Стрелка ж/д", "Стрілка", "Стройка", "Струмок", "Студія", "Суд", "Супермаркет", "Супермаркет", "Такси", "Таксі", "Театр",
		"Телефон", "Телефон для екстрених викликів", "Тематичний парк", "Тераса", "Торгівельно-розважальний центр", "Торговий автомат", "Торговий центр", "торговый автомат", "Торговый центр", "Торф", "Точка", "Трава", "Трамвай", "Трамвайна зупинка", "трамвайная остановка",
		"Трамвайная остановка", "Трамвайні колії", "Тренажерний зал", "тренажерный зал", "Третьорядна дорога", "Тротуар", "Туалет", "Турбаза", "Туристической агентство", "Туристична агенція", "Турнікет", "Тюрьма", "Уезд", "Узбережжя", "Укриття",
		"Университет", "Университет", "Універмаг", "Універсам", "Університет", "Університет", "Ферма", "Ферма", "Ферма", "Ферма", "Фермерське подвір'я", "Фіорд", "фонтан", "Фонтан", "фотомагазин",
		"Фотомагазин", "Фуникулер", "Фунікулер", "Фьорд", "Хімтовари", "Хімчистка", "Хліб", "Хозтовари", "Хостел", "Храм", "Храм", "Хребет", "Художній салон", "Хутір", "Цветочный магазин",
		"Цвинтар", "Центр здоров'я", "Церковь", "Церковь", "Цікаві місця", "Чагарник", "Шале", "Шахта", "Швидкісний трамвай", "школа", "Школа", "Школа", "Шлюз", "Шлюзові ворота", "Щебінь",
		"Ювелирный магазин", "Ювелірний магазин", "Якірна стоянка"
	],

	/**
	 * @param String nameFinderURL http://nominatim.openstreetmap.org/search. To work around the same origin policy, pass a wrapper that lives on your webspace.
	*/
	initialize : function(nameFinderURL) {
		FacilMap.NameFinder.prototype.initialize.apply(this, [ ]);
		if(nameFinderURL)
			this.nameFinderURL = nameFinderURL;
	},
	find : function(query, callbackFunction) {
		query.replace(/^\s+/, "").replace(/\s+$/, "");

		var nameFinder = this;

		FacilMap.NameFinder.prototype.find.apply(this, [ query, function(results) {
			if(results != undefined && results.length > 0)
				callbackFunction(results);
			else
			{ // NameFinder
				OpenLayers.Request.GET({
					url : nameFinder.nameFinderURL,
					params : { "q": query, "format" : "xml", "polygon" : "0", "addressdetails" : "0" },
					success : function(request) {
						var results = [ ];
						if(request.responseXML)
						{
							var searchresults = request.responseXML.getElementsByTagName("searchresults");

							if(searchresults.length > 0)
							{
								if(searchresults[0].getAttribute("findplace") == null || searchresults[0].getAttribute("findplace") == "" || searchresults[0].getAttribute("foundnearplace") == "yes")
								{
									var named = searchresults[0].childNodes;
									for(var i=0; i<named.length; i++)
									{
										if(named[i].nodeType != 1) continue;

										var box = named[i].getAttribute("boundingbox").split(",");
										(function(box) {
											results.push({
												lonlat : new OpenLayers.LonLat(named[i].getAttribute("lon"), named[i].getAttribute("lat")),
												name : named[i].getAttribute("display_name"),
												info : named[i].getAttribute("class"),
												icon : named[i].getAttribute("icon"),
												getZoom : function(map) {
													return map.getZoomForExtent(box.clone().transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()));
												},
												osm : null
											});
										})(new OpenLayers.Bounds(box[2], box[1], box[3], box[0]));
									}
								}
							}
						}

						callbackFunction(results);
					},
					failure : function() {
						callbackFunction();
					}
				});
			}
		} ]);
	},

	getLocationPart : function(query) {
		var delim = /\s*,\s*/;

		var pos = 0;
		var newPos;
		while(pos < query.length)
		{
			newPos = query.substr(pos).search(delim);
			var match;
			if(newPos == -1)
			{
				newPos = query.length-pos;
				match = "";
			}
			else
				match = query.substr(pos).match(delim)[0];
			var part = query.substr(pos, newPos).replace(/^\s+/, "").replace(/\s+$/, "").toLowerCase();
			var special = false;
			for(var i=0; i<this.specialWords.length; i++)
			{
				if(this.specialWords[i].toLowerCase() == part)
				{
					special = true;
					break;
				}
			}

			if(!special)
				return [ pos, query.length-pos ];

			pos += newPos + match.length;
		}

		return null;
	},

	CLASS_NAME : "FacilMap.NameFinder.Nominatim"
});