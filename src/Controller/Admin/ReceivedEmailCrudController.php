<?php

namespace App\Controller\Admin;

use App\Entity\ReceivedEmail;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ReceivedEmailCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ReceivedEmail::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->setDisabled(),
            TextField::new('realFrom'),
            TextField::new('realTo'),
            TextField::new('subject'),
            TextField::new('fromName'),
            TextField::new('fromAddress'),
            TextField::new('toMultipleString'),
            TextField::new('bccMultipleString'),
            TextField::new('html')->hideOnIndex(),
            DateTimeField::new('createdAt'),
            TextField::new('metadataString')->hideOnIndex(),
        ];
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->disable(Action::NEW, Action::EDIT)
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
        ;
    }
}
