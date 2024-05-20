-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE database caretech; 

use caretech; 

create table plano(
    id_plano   int auto_increment primary key,
    nome varchar(45),
    valor double,
    qtd_maquinas int,
    qtd_usuarios int
);

create table empresa(
    id_empresa    int auto_increment primary key,
    razao_social  varchar(45),
    cnpj varchar(45),
    fk_plano int,
    constraint fk_plano foreign key (fk_plano) references plano (id_plano)
);

create table computador
(
    id_computador   int auto_increment primary key,
    estacao_de_trabalho varchar(45),
    login varchar(45),
    senha varchar(16),
    nome_computador varchar(45),
    chave_acesso    varchar(45),
    fk_empresa int,
    constraint fk_empresa_comp
    foreign key (fk_empresa) references empresa (id_empresa)
);

create table hardware(
    id_hardware INT PRIMARY KEY AUTO_INCREMENT,
    nome_hardware varchar(45),
    capacidade_total double,
    fk_computador INT,
    constraint fk_computador_hardware foreign key (fk_computador) references computador(id_computador)
);

create table registros(
    id_registros int auto_increment,
    horario datetime default current_timestamp,
    qtd_processos INT,
    fk_hardware INT,
    constraint fk_hardware foreign key (fk_hardware) references hardware(id_hardware),
    primary key(id_registros, fk_hardware)
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

INSERT INTO plano (nome, valor, qtd_maquinas, qtd_usuarios) VALUES ('Plano Básico', 50.00, 3, 3);

-- Inserir plano 2
INSERT INTO plano (nome, valor, qtd_maquinas, qtd_usuarios) VALUES ('Plano Standard', 100.00, 4, 4);

-- Inserir plano 3
INSERT INTO plano (nome, valor, qtd_maquinas, qtd_usuarios) VALUES ('Plano Premium', 150.00, 5, 5);

-- Inserir usuário 1
INSERT INTO usuario (nome, login_email, senha, fk_empresa, tipo_usuario)
VALUES ('João Silva', 'joao@example.com', 'senha123', 1, 'administrador');

-- Inserir usuário 2
INSERT INTO usuario (nome, login_email, senha, fk_empresa, tipo_usuario)
VALUES ('Maria Santos', 'maria@example.com', 'senha456', 1, 'funcionario');

-- Inserir usuário 3
INSERT INTO usuario (nome, login_email, senha, fk_empresa, tipo_usuario)
VALUES ('Pedro Oliveira', 'pedro@example.com', 'senha789', 2, 'administrador');

select * from empresa;

select usuario.*, empresa.fk_plano from usuario join empresa on fk_empresa = empresa.id_empresa;

update empresa set fk_plano = 1 where id_empresa = 1;




/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
