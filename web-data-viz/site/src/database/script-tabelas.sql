DROP DATABASE IF EXISTS caretech;

CREATE DATABASE caretech;

use caretech;

create table plano(
    id_plano   int auto_increment primary key,
    nome varchar(45),
    valor double,
    qtd_maquinas int,
    qtd_usuarios int
);

INSERT INTO plano (nome, valor, qtd_maquinas, qtd_usuarios) VALUES ('Plano Básico', 50.00, 3, 3);

INSERT INTO plano (nome, valor, qtd_maquinas, qtd_usuarios) VALUES ('Plano Standard', 100.00, 4, 4);

INSERT INTO plano (nome, valor, qtd_maquinas, qtd_usuarios) VALUES ('Plano Premium', 150.00, 5, 5);


create table empresa(
    id_empresa    int auto_increment primary key,
    razao_social  varchar(45),
    cnpj varchar(45),
    fk_plano int,
    constraint fk_plano foreign key (fk_plano) references plano (id_plano)
);

INSERT INTO empresa (razao_social, cnpj, fk_plano) values
    ("Empresa 1", "1231232123", 1);


create table computador(
    id_computador   int auto_increment primary key,
    estacao_de_trabalho varchar(45),
    login varchar(45),
    senha varchar(16),
    fk_empresa int,
    constraint fk_empresa_comp
    foreign key (fk_empresa) references empresa (id_empresa)
);

INSERT INTO computador (estacao_de_trabalho, login, senha, fk_empresa) values ("area_a_1", "ti_user", "ti_password", 1);

create table hardware(
    id_hardware INT AUTO_INCREMENT,
    nome_hardware varchar(45),
    capacidade_total double,
    min double,
    max double,
    fk_computador INT,
    constraint fk_computador_hardware foreign key (fk_computador) references computador(id_computador),
    primary key (id_hardware, fk_computador)
);

create table registros(
    id_registros int auto_increment,
    uso_capacidade DOUBLE,
    horario datetime default current_timestamp,
    qtd_processos INT,
    fk_hardware INT,
    constraint fk_hardware foreign key (fk_hardware) references hardware(id_hardware),
    fk_computador INT,
    constraint fk_computador_hard_regis foreign key (fk_computador) references computador(id_computador),
    primary key(id_registros, fk_hardware, fk_computador)
);

create table sites_bloqueados(
    id_sites   int auto_increment,
    nome varchar(45),
    url varchar(45),
    fk_empresa int,
    primary key (id_sites, fk_empresa),
    constraint fk_empresa foreign key (fk_empresa) references empresa (id_empresa)
);

create table usuario(
    id_user      int auto_increment primary key,
    nome         varchar(45),
    login_email  varchar(30),
    senha        varchar(12),
    fk_empresa   int,
    tipo_usuario varchar(45),
    constraint fk_empresa_user foreign key (fk_empresa) references empresa (id_empresa)
);

INSERT INTO usuario (nome, login_email, senha, fk_empresa, tipo_usuario)
VALUES ('João Silva', 'joao@example.com', 'senha123', 1, 'administrador');

DELIMITER $$
CREATE PROCEDURE deletarComputador(IN idDoComputador INT)
BEGIN

    declare fkHardware INT;

    SELECT hardware.id_hardware into fkHardware from hardware where fk_computador = idDoComputador;

    DELETE FROM registros WHERE  fk_hardware = fkHardware;
    DELETE FROM hardware WHERE  fk_computador = idDoComputador;
    DELETE FROM computador WHERE id_computador = idDoComputador;

END $$

-- DROP PROCEDURE IF EXISTS deletarComputador;
-- call deletarComputador(1);

select * from plano;

select * from empresa;

select * from computador;

SELECT * FROM hardware;

select * from registros;

select * from usuario;
