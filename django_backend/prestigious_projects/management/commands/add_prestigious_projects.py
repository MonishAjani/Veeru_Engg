from django.core.management.base import BaseCommand
from prestigious_projects.models import PrestigiousProject

class Command(BaseCommand):
    help = 'Add sample prestigious projects'

    def handle(self, *args, **options):
        # Sample prestigious projects data
        projects_data = [
            {
                'name': 'AMRUTHA CONSTRUCTIONS PVT.LTD.',
                'details': 'Structural fabrication and erection for industrial facility including heavy equipment installation and piping work.',
                'quantity': '2000 MT',
                'location': 'Nagpur, Maharashtra',
                'client': 'Amrutha Constructions Pvt. Ltd.',
                'order': 1,
                'is_active': True
            },
            {
                'name': 'S.S.Fabricators (Engineers & Contractors)',
                'details': 'Complete structural steel fabrication and erection for manufacturing plant expansion project.',
                'quantity': '650 MT',
                'location': 'Pune, Maharashtra',
                'client': 'S.S.Fabricators',
                'order': 2,
                'is_active': True
            },
            {
                'name': 'Sunil Hitech Engineers Ltd.',
                'details': 'Industrial piping and equipment installation for power plant with high-precision requirements.',
                'quantity': '1200 MT',
                'location': 'Raipur, Chhattisgarh',
                'client': 'Sunil Hitech Engineers Ltd.',
                'order': 3,
                'is_active': True
            },
            {
                'name': 'Jindal Power Plant Project',
                'details': 'Large-scale power plant construction with advanced structural engineering and precision fabrication.',
                'quantity': '3500 MT',
                'location': 'Raigarh, Chhattisgarh',
                'client': 'Jindal Steel & Power Ltd.',
                'order': 4,
                'is_active': True
            },
            {
                'name': 'Adani Power Plant Infrastructure',
                'details': 'Comprehensive infrastructure development for thermal power plant including structural steel and piping systems.',
                'quantity': '2800 MT',
                'location': 'Mundra, Gujarat',
                'client': 'Adani Power Ltd.',
                'order': 5,
                'is_active': True
            }
        ]

        # Create prestigious projects
        for project_data in projects_data:
            project, created = PrestigiousProject.objects.get_or_create(
                name=project_data['name'],
                defaults=project_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created prestigious project: {project.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Prestigious project already exists: {project.name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully added sample prestigious projects!')
        )
