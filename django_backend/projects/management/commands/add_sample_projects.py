from django.core.management.base import BaseCommand
from projects.models import LiveProject, CompletedProject
from django.utils import timezone
import os
from django.core.files.base import ContentFile
from django.core.files.images import ImageFile

class Command(BaseCommand):
    help = 'Adds sample live and completed projects to the database'

    def handle(self, *args, **options):
        # Check if there are already projects in the database
        if LiveProject.objects.exists() or CompletedProject.objects.exists():
            self.stdout.write(self.style.WARNING('Projects already exist in the database. Skipping...'))
            return

        # Sample live projects
        live_projects = [
            {
                'name': 'ADANI INFRA. (INDIA) LIMITED',
                'details': '2 X 800 MW Ultra Supercritical Coal based Thermal Power Project',
                'quantity': '18 KM',
                'location': 'Village Motia Dist. Godda J.H.',
            },
            {
                'name': 'PRAVAHA TECHNOLOGIES',
                'details': 'Fabrication of 3000 mm Dia 17 mm thick SAW welded bare Pipes for Nandawadagi Project Site at Karnataka',
                'quantity': '17000 MT',
                'location': 'Karnataka',
            },
            {
                'name': 'AFCONS INFRASTRUCTURE LIMITED',
                'details': 'Pile Liner Fabrication Work 6400 MT\nTAB Superstructure Fabrication work 2000 MT\nProject "Greater Male Connectivity – Male to Thilafushi Link Project"',
                'quantity': '8400 MT',
                'location': 'Male, Maldives',
            },
            {
                'name': 'AMRUTHA CONSTRUCTIONS PVT.LTD.',
                'details': 'Fabrication of 1388 mm Dia, 8 mm thick SAW Welded MS Pipes',
                'quantity': '6500 MT',
                'location': 'Near Aparala village, Devadurga Taluk, Raichur District',
            },
            {
                'name': 'S.S.Fabricators & manufactures Pvt.Ltd.',
                'details': 'Manufacturing & Supply of M.S. Pipes at Ghodazari SB-04 PDN Project',
                'quantity': '5000 MT',
                'location': 'Ghodazari',
            },
            {
                'name': 'Adani Power Limited',
                'details': 'CW, ACW and RW Piping along with fittings, valves and accessories for 2x800 MW Raipur and Raigarh (Phase-II) Ultra Super Critical Thermal Power Project',
                'quantity': '10000 MT',
                'location': 'Raipur and Raigarh',
            },
        ]

        # Sample completed projects
        completed_projects = [
            {
                'name': 'NTPC Singrauli - U.P.',
                'details': 'Pipe fabrication and installation for power plant',
                'quantity': 'Pipe 3200 Dia. 20mm 1500 MT',
                'client': 'Permanent Prestress Pvt. Ltd.',
                'completion_date': '2023-06-15',
            },
            {
                'name': 'Godavari Project - NCC - A.P.',
                'details': 'Large diameter pipe fabrication for irrigation project',
                'quantity': 'Pipe 3000 Dia. 16mm 4500 MT',
                'client': 'Permanent Prestress Pvt. Ltd.',
                'completion_date': '2022-12-10',
            },
            {
                'name': 'JSW Bellary - Karnataka',
                'details': 'Pig casting Machine Fabrication & Erection',
                'quantity': '1200 MT',
                'client': 'KBS Paramount Pvt. Ltd.',
                'completion_date': '2023-03-22',
            },
            {
                'name': 'SS Fabricators & Manufacturers - M.H.',
                'details': 'Medium diameter pipe fabrication for water supply project',
                'quantity': 'Pipe 1200 Dia. 10mm 3500 MT',
                'client': 'SS Fabricators',
                'completion_date': '2022-09-05',
            },
            {
                'name': 'NTPC Sipat- Stage II - Bilaspur. - C.G.',
                'details': 'Cooling water system fabrication and installation',
                'quantity': 'CW System 660 MT',
                'client': 'Kirloskar Brothers Ltd.',
                'completion_date': '2021-11-30',
            },
            {
                'name': 'NTPC Sipat- Stage I - Bilaspur. - C.G.',
                'details': 'Large diameter pipe fabrication for power plant',
                'quantity': 'Pipe 3750 & 1000 Dia. 20mm 5500 MT',
                'client': 'Permanent Prestress Pvt. Ltd.',
                'completion_date': '2021-05-18',
            },
            {
                'name': 'MIHAN Project - Nagpur - M.H.',
                'details': 'Medium diameter pipe fabrication for infrastructure project',
                'quantity': 'Pipe 965 Dia. 10mm 6500 MT',
                'client': 'MIHAN Authority',
                'completion_date': '2020-12-22',
            },
        ]

        # Create live projects
        for project_data in live_projects:
            project = LiveProject.objects.create(**project_data)
            self.stdout.write(self.style.SUCCESS(f'Created live project: {project.name}'))

        # Create completed projects
        for project_data in completed_projects:
            project = CompletedProject.objects.create(**project_data)
            self.stdout.write(self.style.SUCCESS(f'Created completed project: {project.name}'))

        self.stdout.write(self.style.SUCCESS('Successfully added sample projects'))