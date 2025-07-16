import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Work {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_url?: string;
  live_url?: string;
  category: string;
  order_index: number;
  is_featured: boolean;
  is_active: boolean;
}

interface WorkFormData {
  title: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  category: string;
  order_index: number;
  is_featured: boolean;
  is_active: boolean;
}

const categoryOptions = [
  'Web Development',
  'Mobile Development',
  'Backend Development',
  'Frontend Development',
  'Full Stack',
  'UI/UX Design',
  'Other'
];

export const WorkManager = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<WorkFormData>({
    title: '',
    description: '',
    image_url: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
    category: 'Web Development',
    order_index: 0,
    is_featured: false,
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setWorks(data || []);
    } catch (error) {
      console.error('Error fetching works:', error);
      toast({
        title: 'Error',
        description: 'Failed to load works',
        variant: 'destructive'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null
      };

      if (editingWork) {
        // Update existing work
        const { error } = await supabase
          .from('works')
          .update(submitData)
          .eq('id', editingWork.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Project updated successfully'
        });
      } else {
        // Create new work
        const { error } = await supabase
          .from('works')
          .insert([submitData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Project created successfully'
        });
      }

      resetForm();
      fetchWorks();
    } catch (error) {
      console.error('Error saving work:', error);
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      description: work.description,
      image_url: work.image_url,
      tech_stack: work.tech_stack,
      github_url: work.github_url || '',
      live_url: work.live_url || '',
      category: work.category,
      order_index: work.order_index,
      is_featured: work.is_featured,
      is_active: work.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('works')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Project deleted successfully'
      });

      fetchWorks();
    } catch (error) {
      console.error('Error deleting work:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      tech_stack: '',
      github_url: '',
      live_url: '',
      category: 'Web Development',
      order_index: works.length,
      is_featured: false,
      is_active: true
    });
    setEditingWork(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Management</h2>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingWork ? 'Edit Project' : 'Add New Project'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., E-commerce Website"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the project..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use realistic project mockup images that represent your actual applications
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tech Stack</label>
                  <Input
                    value={formData.tech_stack}
                    onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                    placeholder="e.g., React, Node.js, MongoDB"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL (Optional)</label>
                  <Input
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Live URL (Optional)</label>
                  <Input
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <Input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <label className="text-sm font-medium">Featured</label>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <label className="text-sm font-medium">Active</label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Project'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Works List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {works.map((work) => (
          <Card key={work.id} className="relative">
            <CardContent className="p-4">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                <img 
                  src={work.image_url} 
                  alt={work.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                {work.is_featured && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{work.title}</h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(work)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(work.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {work.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{work.category}</Badge>
                  <Badge variant={work.is_active ? 'default' : 'secondary'}>
                    {work.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Tech: {work.tech_stack}
                </div>
                
                <div className="flex gap-2">
                  {work.github_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={work.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {work.live_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={work.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Order: {work.order_index}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};