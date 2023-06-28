DROP TABLE IF EXISTS AirlineDelays CASCADE;

CREATE TABLE AirlineDelays (
    year_ int,
	month_ int,
	carrier varchar,
	carrier_name varchar,
	airport varchar,
	arr_flights float,
	arr_del15 float,
	carrier_ct float,
	weather_ct float, 
	nas_ct float,
	security_ct float,
	late_aircraft_ct float,
	arr_cancelled float,
	arr_diverted float,
	arr_delay float,
	carrier_delay float,
	weather_delay float,
	nas_delay float,
	security_delay float,
	late_aircraft_delay float,
	arr_del15_per float,
	arr_weather_delay_per float,
	arr_carrier_delay_per float,
	arr_nas_delay_per float,
	arr_late_aircraft_delay_per float,
	arr_cancelled_per float,
	arr_security_cancelled_per float,

	location varchar);
	
	select * from AirlineDelays
